import { EventEmitter } from "events";
import { v4 as uuidv4 } from "uuid";

export class UploadTask {
  completed: boolean;
  url: string | null;

  name?: string;
  file: File;
  directory?: string;

  constructor(file: File, name?: string, directory?: string) {
    this.file = file;
    this.completed = false;
    this.url = null;
    this.name = name;
    this.directory = directory;
  }

  getStoragePath() {
    return `${this.directory || ""}${this.name || this.file.name}`;
  }

  async run(
    storageRef: firebase.storage.Reference,
    handleProgress?: (name: string, progress: number, state: string, completed: boolean, url: string | null) => void
  ) {
    const task = storageRef.child(this.getStoragePath()).put(this.file);

    const handleProgressChange = (snapshot: firebase.storage.UploadTaskSnapshot) => {
      if (handleProgress) {
        const fractionTransfered = snapshot.bytesTransferred / snapshot.totalBytes;
        handleProgress(this.file.name, fractionTransfered, snapshot.state, false, null);
      }
    };

    task.on("state_changed", handleProgressChange);

    return task.then(async (snapshot: firebase.storage.UploadTaskSnapshot) => {
      const fractionTransfered = snapshot.bytesTransferred / snapshot.totalBytes;
      const downloadUrl = await snapshot.ref.getDownloadURL();
      if (handleProgress) {
        handleProgress(this.file.name, fractionTransfered, snapshot.state, true, downloadUrl);
      }
      return downloadUrl;
    });
  }
}

interface ITaskDetails {
  progress: number;
  state: string;
  completed?: boolean | undefined;
  url?: string | null | undefined;
}

export interface IUploadStatus {
  [key: string]: ITaskDetails;
}

interface IFileUploadManagerOptions {
  directory?: string;
  extra?: string;
  uuid?: boolean;
}

export default class FirebaseUploadManager extends EventEmitter {
  private storage: firebase.storage.Reference;
  private taskQueue: UploadTask[] = [];
  private taskDetails: IUploadStatus = {};
  private options?: IFileUploadManagerOptions = { uuid: true };

  constructor(storage: firebase.storage.Reference) {
    super();
    this.storage = storage;
  }

  public add(...files: File[]) {
    this.taskQueue = files.map(file => new UploadTask(file, this.getUrlFileName(file), this.options?.directory));
  }

  public setOptions(options: IFileUploadManagerOptions) {
    this.options = { ...this.options, ...options };
  }

  private getUrlFileName(file: File) {
    let name = file.name.substr(0, file.name.lastIndexOf(".")) || file.name;
    if (this.options?.extra) {
      name = `${name}-${this.options.extra}`;
    }
    if (this.options?.uuid) {
      name += `-${uuidv4()}`;
    }
    return name;
  }

  private handleUploadStatus(
    name: string,
    progress: number,
    state: string,
    completed?: boolean | undefined,
    url?: string | null | undefined
  ) {
    this.taskDetails[name] = { progress, state, completed, url };
    this.emit("update", this.taskDetails);
  }

  public getStatus() {
    return this.taskDetails;
  }

  public async upload(): Promise<string[]> {
    return Promise.all(this.taskQueue.map(async task => await task.run(this.storage, this.handleUploadStatus.bind(this))));
  }
}
