import { flow, observable, action, observe, toJS } from "mobx";
import { getItemByCategory } from "../api/api";
import { SortTypes } from "../components/SortBySelect/SortBySelect";
import { getSortedItems } from "../utils/sort";

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

export interface ICategoryQuery {
  [key: string]: string | undefined;
  category?: string;
  subCategory?: string;
  itemCategory?: string;
  specificCategory?: string;
}

export default class ItemStore {
  @observable
  items: IShopItem[] = [];

  @observable
  sortType: SortTypes = SortTypes.NONE;

  @observable
  filtered?: IShopItem[] = undefined;

  @observable status = { state: "inactive", error: {} };
  @observable error = {};

  @observable
  breadcrumbs: string[] = [];

  constructor() {
    observe(this, change => {
      console.log(toJS(this));
      if (change.name === "sortType") {
        if (this.sortType !== SortTypes.NONE) {
          this.filtered = getSortedItems(this.sortType, this.items);
        } else {
          this.filtered = undefined;
        }
      }
    });
  }

  @action
  fetchItems = flow(function*(this: ItemStore, categoryQuery: ICategoryQuery) {
    this.breadcrumbs = Object.values(categoryQuery).filter(e => e) as string[];

    this.items = [];
    this.status.state = "pending";
    try {
      const promiseItems = yield getItemByCategory(categoryQuery);
      const fetchedItems = yield promiseItems.json();
      this.items = fetchedItems;
      this.status.state = "done";
    } catch (error) {
      this.status = { state: "error", error };
    }
  });

  @action
  setSortType = (sortType: SortTypes) => {
    this.sortType = sortType;
  };

  getItems() {
    if (this.filtered) return this.filtered;
    return this.items;
  }
}
