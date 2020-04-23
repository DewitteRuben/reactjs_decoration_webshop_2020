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

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

const IUserStrippedPartial = t.partial({
  photoURL: t.string,
  gender: createEnumType<Gender>(Gender, "Gender")
});

export const IUserStrippedRuntime = t.intersection([
  t.interface({
    username: t.string
  }),
  IUserStrippedPartial
]);

const user = t.interface({
  firstName: t.string,
  lastName: t.string,
  username: t.string,
  emailAddress: t.string,
  phoneNumber: t.string,
  photoURL: t.string,
  gender: createEnumType<Gender>(Gender, "Gender"),
  address: t.interface({
    street: t.string,
    postalCode: t.string,
    city: t.string,
    country: t.string
  })
});

const Nullable = t.union([t.null, t.undefined]);

const userbirthdateDateField = t.interface({ birthdate: t.union([date, Nullable]) });
const userbirthdateStringField = t.interface({ birthdate: t.string });

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

const otherShopItemFields = t.interface({
  wishlists: t.number
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

const mongoDbItems = t.interface({
  userId: t.string,
  createdAt: date,
  updatedAt: date
});

const mongoDbItemsStringified = t.interface({
  userId: t.string,
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
  otherShopItemFields,
  shopItemDatabaseFields,
  mainShopItemFields,
  shopItemImagesField,
  mongoDbItems
]);

export const IShopItemsRuntime = t.array(IShopItemRuntime);

export const IShopItemDataPrice = t.partial({
  minPrice: t.number,
  maxPrice: t.number
});

export const IShopItemDataRuntime = t.intersection([
  IShopItemDataPrice,
  t.interface({
    items: IShopItemsRuntime
  })
]);

export const IShopItemStringifiedRuntime = t.intersection([
  shopItemDatabaseFields,
  mainShopItemFields,
  shopItemImagesField,
  mongoDbItemsStringified
]);

export const INewUserStringified = t.intersection([user, userbirthdateStringField]);

export const INewShopItemRuntime = t.intersection([mainShopItemFields, shopItemAddImageField]);
export const IUserRuntimeStringified = t.intersection([user, userbirthdateStringField, mongoDbItemsStringified]);
export const IUserRuntime = t.intersection([user, userbirthdateDateField, mongoDbItems]);
export const INewUserRuntime = t.intersection([user, userbirthdateDateField]);
export const IUserPartialStringifiedRuntime = t.partial({
  ...user.props,
  ...userbirthdateStringField.props,
  ...mongoDbItemsStringified.props
});
export const IUserPartialRuntime = t.partial({
  ...user.props,
  ...userbirthdateDateField.props,
  ...mongoDbItems.props
});

export type IShopItemImage = t.TypeOf<typeof shopItemImageFromServer>;
export type IShopItemImages = t.TypeOf<typeof shopItemImagesFromServer>;
export type INewShopItem = t.TypeOf<typeof INewShopItemRuntime>;

export type IUser = t.TypeOf<typeof IUserRuntime>;
export type IUserStringified = t.TypeOf<typeof IUserRuntimeStringified>;
export type INewUser = t.TypeOf<typeof INewUserRuntime>;
export type INewUserStringified = t.TypeOf<typeof INewUserStringified>;
export type IUserPartialStringified = t.TypeOf<typeof IUserPartialStringifiedRuntime>;
export type IUserPartial = t.TypeOf<typeof IUserPartialRuntime>;

export type IShopItemNotFoundErrorResponse = t.TypeOf<typeof IShopItemNotFoundErrorResponseRuntime>;
export type IShopItem = t.TypeOf<typeof IShopItemRuntime>;
export type IShopItems = t.TypeOf<typeof IShopItemsRuntime>;
export type IShopItemData = t.TypeOf<typeof IShopItemDataRuntime>;
export type IShopItemStringified = t.TypeOf<typeof IShopItemStringifiedRuntime>;
export type IUserStripped = t.TypeOf<typeof IUserStrippedRuntime>;
