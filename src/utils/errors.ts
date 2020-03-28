import { IShopItemNotFoundErrorResponse } from "../io-ts-types";

export class ShopItemNotFoundError extends Error {
  public errorData: IShopItemNotFoundErrorResponse;

  constructor(errorData: IShopItemNotFoundErrorResponse) {
    super();
    this.errorData = errorData;
    this.message = errorData.message;
  }
}
