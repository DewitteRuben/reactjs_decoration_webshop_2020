import * as t from "io-ts";
import { date } from "io-ts-types/lib/date";

export class EnumType<A> extends t.Type<A> {
  public readonly _tag: "EnumType" = "EnumType";
  public enumObject!: object;
  public constructor(e: object, name?: string) {
    super(
      name || "enum",
      (u): u is A => Object.values(this.enumObject).some(v => v === u),
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity
    );
    this.enumObject = e;
  }
}

// simple helper function
export const createEnumType = <T,>(e: object, name?: string) => new EnumType<T>(e, name);

export enum Condition {
  NEW = "new",
  LIKE_NEW = "like-new",
  GOOD = "good",
  POOR = "poor",
  FAIR = "fair"
}

const shopItemImageFromServer = t.interface({
  small: t.string,
  regular: t.string,
  full: t.string,
  thumb: t.string
});

const shopItemImagesFromServer = t.array(shopItemImageFromServer);

const shopItemDatabaseFields = t.interface({
  id: t.string,
  _id: t.string
});

const mainShopItemFields = t.interface({
  category: t.string,
  subCategory: t.string,
  itemCategory: t.string,
  specificCategory: t.string,
  name: t.string,
  description: t.string,
  price: t.number,
  condition: createEnumType<Condition>(Condition, "Condition")
});

const shopItemAddImageField = t.interface({
  images: t.array(t.string)
});

const shopItemImagesField = t.interface({
  images: shopItemImagesFromServer
});

const optionalShopItemFields = t.partial({
  userId: t.string,
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

export const IShopItemRuntime = t.intersection([
  shopItemDatabaseFields,
  mainShopItemFields,
  shopItemImagesField,
  optionalShopItemFields
]);
export const IShopItemStringifiedRuntime = t.intersection([
  shopItemDatabaseFields,
  mainShopItemFields,
  shopItemImagesField,
  optionalStringifiedShopItemFields
]);

export const INewShopItem = t.intersection([mainShopItemFields, shopItemAddImageField]);

export type IShopItemImage = t.TypeOf<typeof shopItemImageFromServer>;
export type IShopItemImages = t.TypeOf<typeof shopItemImagesFromServer>;
export type INewShopItem = t.TypeOf<typeof INewShopItem>;

export type IShopItemNotFoundErrorResponse = t.TypeOf<typeof IShopItemNotFoundErrorResponseRuntime>;
export type IShopItem = t.TypeOf<typeof IShopItemRuntime>;
export type IShopItemStringified = t.TypeOf<typeof IShopItemStringifiedRuntime>;
