import _ from "lodash";
import { SortTypes } from "../components/SortBySelect/SortBySelect";
import { IShopItem } from "../io-ts-types";

const sortByPriceAsc = (arr: IShopItem[]) => {
  return _.orderBy(arr, ["price"], "asc");
};

const sortByPriceDesc = (arr: IShopItem[]) => {
  return _.orderBy(arr, ["price"], "desc");
};

const sortByNewest = (arr: IShopItem[]) => {
  return _.orderBy(arr, ["updatedAt"], "asc");
};

const sortByPopularity = (arr: IShopItem[]) => {
  return _.orderBy(arr, ["wishlists"], "desc");
};

type IItemSortMap = {
  [key in SortTypes]?: (arr: IShopItem[]) => IShopItem[];
};

const sortItemsMap: IItemSortMap = {
  [SortTypes.HIGHEST_PRICE]: sortByPriceDesc,
  [SortTypes.LOWEST_PRICE]: sortByPriceAsc,
  [SortTypes.NEWEST]: sortByNewest,
  [SortTypes.POPULAR]: sortByPopularity
};

const getSortedItems = (key: SortTypes, arr: IShopItem[]): IShopItem[] => {
  const sortFunc = sortItemsMap[key];
  if (sortFunc) {
    return sortFunc(arr);
  }
  return arr;
};

export { getSortedItems };
