import { observable, action, flow } from "mobx";
import { IShopItem, IShopItemNotFoundErrorResponse, IShopItemNotFoundErrorResponseRuntime } from "../io-ts-types";
import { getItemById } from "../api/api";
import { isRight } from "fp-ts/lib/Either";

interface IStatus {
  state: "inactive" | "pending" | "error" | "done";
  error: IShopItemNotFoundErrorResponse;
}

const sanitizeId = (id: string) => {
  if (!id.includes("-")) {
    return id;
  }

  const parsedId = id.split("-")[1];
  if (!parsedId) throw new Error("Id is invalid");
  return parsedId;
};

export class DetailStore {
  @observable
  item?: IShopItem;

  @observable
  status: IStatus = { state: "inactive", error: {} as IShopItemNotFoundErrorResponse };

  @action
  fetchItem = flow(function*(this: DetailStore, id: string) {
    try {
      if (!id) throw new Error("Id is not defined.");

      this.status.state = "pending";
      const promiseItems = yield getItemById(sanitizeId(id));
      const jsonResponse: IShopItem | IShopItemNotFoundErrorResponse = yield promiseItems.json();
      if (isRight(IShopItemNotFoundErrorResponseRuntime.decode(jsonResponse))) {
        throw jsonResponse as IShopItemNotFoundErrorResponse;
      }
      this.item = jsonResponse as IShopItem;
      this.status.state = "done";
    } catch (error) {
      this.status = { state: "error", error };
    }
  });

  @action
  setItem = (item: IShopItem) => {
    this.status.state = "done";
    this.item = item;
  };

  @action
  setErrorMessage = (message: string) => {
    this.status.state = "error";
    this.status.error.message = message;
  };
}
