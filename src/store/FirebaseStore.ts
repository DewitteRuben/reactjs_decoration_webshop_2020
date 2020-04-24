import { isRight } from "fp-ts/lib/Either";
import { IUserPartialRuntime, INewUser, IShopItem } from "./../io-ts-types/index";
import { dateReviver } from "./../utils/string";
import { IUploadStatus } from "../utils/FirebaseUploadManager";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { observable, computed, flow, action } from "mobx";
import FirebaseUploadManager from "../utils/FirebaseUploadManager";
import {
  addUser,
  getUserByToken,
  updateUser,
  getUserById as apiGetUserById,
  updateItemById as apiUpdateItemById,
  deleteItemById as apideleteItemById
} from "../api/api";
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

// For future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum SignupErrorCode {
  EMAIL_IN_USE = "auth/email-already-in-use",
  INVALID_EMAIL = "auth/invalid-email",
  NOT_ALLOWED = "auth/operation-not-allowed",
  WEAK_PASSWORD = "auth/weak-password"
}

// For future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum LoginErrorCode {
  INVALID_EMAIL = "auth/invalid-email",
  USER_DISABLED = "auth/user-disabled",
  NOT_FOUND = "auth/user-not-found",
  WRONG_PASSWORD = "auth/wrong-password"
}

export enum Information {
  PROFILE_PROCESSING_CHANGES = "Please wait while we update the following item(s):",
  PROFILE_NO_CHANGES = "No changes were made to your profile.",
  ITEM_NO_CHANGES = "No changes were made to the shopitem.",
  ITEM_PROCESSING_DELETE = "Please wait while we're removing the item...",
  ITEM_PROCESSING_ADD = "Please wait while we're adding the item...",
  ITEM_PROCESSING_EDIT = "Please wait while we update the item..."
}

export enum Success {
  LOGOUT_SUCCESS = "Successfully logged out.",
  LOGIN_SUCCESS = "Sucessfully logged in.",
  SIGNUP_SUCCESS = "Successfully created an account.",
  ITEM_CREATE_SUCCESS = "Successfully created the item.",
  ITEM_UPDATE_SUCCESS = "Successfully updated the item.",
  ITEM_DELETE_SUCCESS = "Successfully deleted the item.",
  PROFILE_UPDATE_SUCCESS = "Profile successfully updated.",
  PAYMENT_SUCCESS = "Your payment was successful, the items will be delivered to the shipping address."
}

enum AuthErrorCode {
  NOT_LOGGED_IN = "auth/not-logged-in"
}

export enum UpdateErrorCode {
  INVALID_PHONE_NUMBER = "auth/invalid-phone-number"
}

const updateErrorMessageMap: Record<UpdateErrorCode, string> = {
  [UpdateErrorCode.INVALID_PHONE_NUMBER]: "The phone number you entered is in valid."
};

const loginErrorMessageMap: Record<LoginErrorCode, string> = {
  [LoginErrorCode.NOT_FOUND]: "No user was found that matches these credentials.",
  [LoginErrorCode.INVALID_EMAIL]: "The email address you provided is invalid.",
  [LoginErrorCode.WRONG_PASSWORD]: "The provided password is invalid.",
  [LoginErrorCode.USER_DISABLED]: "This user account has been disabled."
};

const registerErrorMessageMap: Record<SignupErrorCode, string> = {
  [SignupErrorCode.EMAIL_IN_USE]: "The email address you tried to sign up for is already in use.",
  [SignupErrorCode.INVALID_EMAIL]: "The email address you provided is invalid.",
  [SignupErrorCode.NOT_ALLOWED]: "You are not allowed to create an account.",
  [SignupErrorCode.WEAK_PASSWORD]:
    "Weak password, the password must be at least 8 characters long, have a special character and a number."
};

export const getLoginErrorMessage = (errorCode: LoginErrorCode) => {
  return loginErrorMessageMap[errorCode];
};

export const getSignupErrorMessage = (errorCode: SignupErrorCode) => {
  return registerErrorMessageMap[errorCode];
};

export const getUpdateErrorMessage = (errorCode: UpdateErrorCode) => {
  return updateErrorMessageMap[errorCode];
};

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
      this.clearState();

      this.user.user = user;
      await this.fetchUserData();
    });

    this.auth.useDeviceLanguage();

    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  }

  async updateUserData(data: Partial<INewUser>) {
    const token = await this.getJWTToken();

    const resp = await updateUser(data, token);
    const respData = await resp.json();

    if (respData?.error) {
      throw new Error(getUpdateErrorMessage(respData.error.code));
    }

    // Update photoURL of image in state if the user uploaded a new one.
    if (data?.photoURL && data?.photoURL.length > 0) {
      if (this.user.data) {
        this.user.data.photoURL = data.photoURL[0];
      }
    }
  }

  async deleteItemById(id: string) {
    const token = await this.getJWTToken();
    return apideleteItemById(token, id);
  }

  async createUser(username: string, emailAddress: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(emailAddress, password);
    const token = await this.getJWTToken();
    return addUser({ username, emailAddress }, token);
  }

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  clearState() {
    this.user = { user: null, error: null, loaded: false, data: null };
  }

  async logout(): Promise<void> {
    this.clearState();
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
      const userData: string = yield userDataPromise.text();
      const parsedUserData = JSON.parse(userData, dateReviver);
      if (isRight(IUserPartialRuntime.decode(parsedUserData))) {
        this.user.data = parsedUserData;
      } else {
        this.user.error = new Error("The data received from the database is malformed.");
      }

      this.user.loaded = true;
    } catch (error) {
      this.user.loaded = true;
      this.user.error = error;
    }
  });

  async getUserById(userId: string) {
    const token = await this.getJWTToken();
    return apiGetUserById(token, userId);
  }

  getUserId() {
    if (!this.currentUser) {
      throw new Error(AuthErrorCode.NOT_LOGGED_IN);
    }

    return this.currentUser.uid;
  }

  async updateItemById(id: string, updates: Partial<IShopItem>) {
    const token = await this.getJWTToken();
    return apiUpdateItemById(token, id, updates);
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
    if (this.user.loaded && !this.user.user) return null;
    const mergedData = _.merge(this.user.data, _.omit(this.user.user, ["phoneNumber", "photoURL"]));
    return _.isEmpty(mergedData) ? null : mergedData;
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
