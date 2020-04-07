import { IUploadStatus } from "../utils/FirebaseUploadManager";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { observable, computed } from "mobx";
import FirebaseUploadManager from "../utils/FirebaseUploadManager";

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

interface IAuthError {
  signup: SignupErrorCode[];
  login: LoginErrorCode[];
  logout: any[];
  token: any[];
}

interface IUser {
  user: firebase.User | null;
  loaded: boolean;
}

class FirebaseStore {
  @observable
  private firebase: firebase.app.App;

  private auth: firebase.auth.Auth;

  @observable
  private user: IUser = { user: null, loaded: false };

  @observable
  private errors: IAuthError = { signup: [], login: [], logout: [], token: [] };

  private googleAuthProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    this.firebase = firebase.initializeApp(firebaseConfig);

    this.auth = this.firebase.auth();

    this.auth.onAuthStateChanged(user => {
      this.user = { user, loaded: true };
    });

    this.auth.useDeviceLanguage();

    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  async createUser(username: string, email: string, password: string) {
    try {
      const res = await this.auth.createUserWithEmailAndPassword(email, password);
      res.user?.updateProfile({
        displayName: username
      });
    } catch (error) {
      const errorCode = error.code;
      const errorCodeEnum = SignupErrorCode[errorCode as keyof typeof SignupErrorCode];
      this.errors.signup.push(errorCodeEnum);
    }
  }

  async login(email: string, password: string) {
    try {
      return this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorCodeEnum = LoginErrorCode[errorCode as keyof typeof LoginErrorCode];
      this.errors.login.push(errorCodeEnum);
    }
  }

  async logout(): Promise<void> {
    try {
      return this.auth.signOut();
    } catch (error) {
      this.errors.logout.push(error);
    }
  }

  async getJWTToken() {
    if (!this.currentUser) {
      throw new Error(AuthErrorCode.NOT_LOGGED_IN);
    }

    try {
      return this.currentUser.getIdToken();
    } catch (error) {
      this.errors.token.push(error);
    }
  }

  getUserId() {
    if (!this.currentUser) {
      throw new Error(AuthErrorCode.NOT_LOGGED_IN);
    }

    return this.currentUser.uid;
  }

  async doesUserExist(emailAddress: string) {
    try {
      const methods = await this.auth.fetchSignInMethodsForEmail(emailAddress);
      return methods.length > 0;
    } catch (error) {
      this.errors.login.push(error);
      return true;
    }
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
    return this.user.user || this.auth.currentUser;
  }

  @computed
  get isLoggedIn() {
    return this.currentUser !== null;
  }

  @computed
  get isAuthReady() {
    return this.user.loaded;
  }
}

export default FirebaseStore;
