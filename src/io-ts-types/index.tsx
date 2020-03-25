import * as t from "io-ts";
import { date } from "io-ts-types/lib/date";

const mainShopItemFields = t.interface({
  id: t.string,
  _id: t.string,
  category: t.string,
  subCategory: t.string,
  itemCategory: t.string,
  specificCategory: t.string,
  name: t.string,
  description: t.string,
  price: t.number,
  stateOfProduct: t.string,
  images: t.interface({
    small: t.string,
    medium: t.string,
    larqe: t.string,
    thumb: t.string
  })
});

const optionalShopItemFields = t.partial({
  createdAt: date,
  updatedAt: date
});

const optionalStringifiedShopItemFields = t.partial({
  createdAt: t.string,
  updatedAt: t.string
});

export const IShopItemNotFoundErrorResponseRuntime = t.interface({
  error: t.interface({
    message: t.string,
    status: t.number,
    type: t.string,
    itemId: t.string
  }),
  message: t.string
});

export const IShopItemRuntime = t.intersection([mainShopItemFields, optionalShopItemFields]);
export const IShopItemStringifiedRuntime = t.intersection([mainShopItemFields, optionalStringifiedShopItemFields]);

export type IShopItemNotFoundErrorResponse = t.TypeOf<typeof IShopItemNotFoundErrorResponseRuntime>;
export type IShopItem = t.TypeOf<typeof IShopItemRuntime>;
export type IShopItemStringified = t.TypeOf<typeof IShopItemStringifiedRuntime>;
