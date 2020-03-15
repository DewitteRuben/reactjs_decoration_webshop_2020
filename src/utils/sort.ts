import { IShopItem } from "../store/ItemStore";
import _ from "lodash";
import { SortTypes } from "../components/SortBySelect/SortBySelect";

const sortByPriceAsc = (arr: IShopItem[]) => {
  return _.orderBy(arr, ["price"], "asc");
};

const sortByPriceDesc = (arr: IShopItem[]) => {
  return _.orderBy(arr, ["price"], "desc");
};

const sortByNewest = (arr: IShopItem[]) => {
  return _.orderBy(arr, ["updatedAt"], "asc");
};

type IItemSortMap = {
  [key in SortTypes]?: (arr: IShopItem[]) => IShopItem[];
};

const sortItemsMap: IItemSortMap = {
  [SortTypes.HIGHEST_PRICE]: sortByPriceDesc,
  [SortTypes.LOWEST_PRICE]: sortByPriceAsc,
  [SortTypes.NEWEST]: sortByNewest
};

const getSortedItems = (key: SortTypes, arr: IShopItem[]): IShopItem[] => {
  const sortFunc = sortItemsMap[key];
  if (sortFunc) {
    return sortFunc(arr);
  }
  return arr;
};

export { getSortedItems };
