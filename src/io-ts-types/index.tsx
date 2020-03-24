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

export const IShopItemRuntime = t.intersection([mainShopItemFields, optionalShopItemFields]);

export type IShopItem = t.TypeOf<typeof IShopItemRuntime>;
