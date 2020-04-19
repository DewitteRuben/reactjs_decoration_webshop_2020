import { IShopItem } from "../io-ts-types";
import * as H from "history";

export const getLocationFromShopItem = (item: IShopItem) => {
  const { category, subCategory, itemCategory, specificCategory, id, name } = item;
  const parsedName = name.replace(/\s+/g, "").toLowerCase();
  const location: H.LocationDescriptorObject = {
    pathname: `/${category}/${subCategory}/${itemCategory}/${specificCategory}/detail/${parsedName}-${id}`
  };
  return location;
};
