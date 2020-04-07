import { IUploadStatus } from "../utils/FirebaseUploadManager";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { observable, computed, flow, action } from "mobx";
import FirebaseUploadManager from "../utils/FirebaseUploadManager";
import { addUser, getUserByToken } from "../api/api";
import { IUser } from "../io-ts-types";
import _ from "lodash";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

enum SignupErrorCode {
  EMAIL_IN_USE = "auth/email-already-in-use",
  INVALID_EMAIL = "auth/invalid-email",
  NOT_ALLOWED = "auth/operation-not-allowed",
  WEAK_PASSWORD = "auth/weak-password"
}

enum LoginErrorCode {
  INVALID_EMAIL = "auth/invalid-email",
  USER_DISABLED = "auth/user-disabled",
  NOT_FOUND = "auth/user-not-found",
  WRONG_PASSWORD = "auth/wrong-password"
}

enum AuthErrorCode {
  NOT_LOGGED_IN = "auth/not-logged-in"
}

interface IFirebaseUser {
  user: firebase.User | null;
  loaded: boolean;
  data: Partial<IUser> | null;
  error: Error | null;
}

class FirebaseStore {
  @observable
  private firebase: firebase.app.App;

  private auth: firebase.auth.Auth;

  @observable
  private user: IFirebaseUser = { user: null, loaded: false, data: null, error: null };

  private googleAuthProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    this.firebase = firebase.initializeApp(firebaseConfig);

    this.auth = this.firebase.auth();

    this.auth.onAuthStateChanged(async user => {
      this.user.user = user;
      if (user) {
        await this.fetchUserData();
      }
    });

    this.auth.useDeviceLanguage();

    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  async createUser(username: string, emailAddress: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(emailAddress, password);
    const token = await this.getJWTToken();
    await addUser({ username, emailAddress }, token);
  }

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    this.user = { user: null, error: null, loaded: false, data: null };
    return this.auth.signOut();
  }

  async getJWTToken() {
    if (!this.currentUser) {
      throw new Error(AuthErrorCode.NOT_LOGGED_IN);
    }

    return this.currentUser.getIdToken();
  }

  @action
  fetchUserData = flow(function*(this: FirebaseStore) {
    try {
      const token = yield this.getJWTToken();
      const userDataPromise = yield getUserByToken(token);
      const userData = yield userDataPromise.json();
      this.user.loaded = true;
      this.user.data = userData;
    } catch (error) {
      this.user.loaded = true;
      this.user.error = error;
    }
  });

  getUserId() {
    if (!this.currentUser) {
      throw new Error(AuthErrorCode.NOT_LOGGED_IN);
    }

    return this.currentUser.uid;
  }

  async doesUserExist(emailAddress: string) {
    const methods = await this.auth.fetchSignInMethodsForEmail(emailAddress);
    return methods.length > 0;
  }

  async uploadFile(file: File, onUpdate?: (status: IUploadStatus) => void) {
    this.uploadFiles([file], onUpdate);
  }

  async uploadFiles(files: File[], onUpdate?: (status: IUploadStatus) => void) {
    const uid = this.getUserId();
    const storage = this.firebase.storage().ref();
    const bulkUpload = new FirebaseUploadManager(storage);
    bulkUpload.setOptions({ extra: uid });
    bulkUpload.add(...files);
    if (onUpdate) {
      bulkUpload.addListener("update", onUpdate);
    }
    return bulkUpload.upload();
  }

  loginWithGoogle() {
    this.auth.signInWithRedirect(this.googleAuthProvider);
  }

  @computed
  get currentUser() {
    console.log(this.user.user);
    return _.merge(this.user.user || this.auth.currentUser, this.user.data);
  }

  @computed
  get isLoggedIn() {
    return this.currentUser !== null;
  }

  @computed
  get authStatus() {
    return { loaded: this.user.loaded, error: this.user.error };
  }
}

export default FirebaseStore;
