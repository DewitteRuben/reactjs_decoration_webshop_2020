import { flow, observable, action, computed } from "mobx";
import { getItemsWithFilters } from "../api/api";
import { SortTypes } from "../components/SortBySelect/SortBySelect";
import { getSortedItems } from "../utils/sort";
import _ from "lodash";
import { IParams } from "../api/api";

export type Categories = "decoration";

export type Subcategories = "vases-and-flowers";

export type ItemCategories = "vases" | "flowers";

export interface IImages {
  small: string;
  medium: string;
  larqe: string;
  thumb: string;
}

export interface IShopItem {
  _id: string;
  category: string;
  subCategory: string;
  itemCategory: string;
  specificCategory: string;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  stateOfProduct: string;
  images: IImages;
}

export interface IShopItemData {
  items: IShopItem[];
  minPrice?: number;
  maxPrice?: number;
}

export interface ICategoryQuery {
  [key: string]: string | undefined;
  category?: string;
  subCategory?: string;
  itemCategory?: string;
  specificCategory?: string;
}

type Filters = "minPrice" | "maxPrice";
type FiltersMap<T> = { [filter in Filters]?: T };

const initShopItemDetails = { items: [] };
export default class ItemStore {
  @observable
  shopItemData: IShopItemData = _.cloneDeep(initShopItemDetails);

  @observable
  sortType: SortTypes = SortTypes.NONE;

  @observable status = { state: "inactive", error: {} };
  @observable error = {};

  @observable
  breadcrumbs: string[] = [];

  @observable
  filters: FiltersMap<string | number> = {};

  @observable
  categories: ICategoryQuery = {};

  @action
  fetchItems = flow(function*(this: ItemStore) {
    this.breadcrumbs = Object.values(this.categories).filter(e => e) as string[];

    const categories: IParams[] = Object.keys(this.categories).map((key: string) => ({
      value: this.categories[key],
      key
    }));

    const queryParams = [...categories, ...this.filters2Params(this.filters)];

    this.status.state = "pending";
    try {
      const promiseItems = yield getItemsWithFilters(queryParams);
      const fetchedItems = yield promiseItems.json();
      this.shopItemData = fetchedItems;
      this.status.state = "done";
    } catch (error) {
      this.status = { state: "error", error };
    }
  });

  @action
  setSortType = (sortType: SortTypes) => {
    this.sortType = sortType;
  };

  @action
  setFilter = (key: Filters, value: any) => {
    this.filters[key] = value;
  };

  @action
  setFilters = (filters: FiltersMap<string | number>) => {
    this.filters = { ...this.filters, ...filters };
  };

  @action
  clearFilters = () => {
    this.filters = {};
  };

  @action
  setCategories = (categories: ICategoryQuery) => {
    this.clearFilters();
    this.categories = categories;
  };

  filters2Params = (obj: FiltersMap<string | number>): IParams[] => {
    return Object.keys(obj).map((key: Filters | string) => ({
      key: String(key),
      value: String(this.filters[key as Filters])
    }));
  };

  getItems() {
    if (this.sortType !== SortTypes.NONE) {
      return getSortedItems(this.sortType, this.shopItemData.items);
    }
    return this.shopItemData.items;
  }

  @computed
  get minPrice() {
    return this.shopItemData.minPrice;
  }

  @computed
  get maxPrice() {
    return this.shopItemData.maxPrice;
  }
}
