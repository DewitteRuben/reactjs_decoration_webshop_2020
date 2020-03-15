import { flow, observable } from "mobx";
import { getItemByCategory } from "../api/api";

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

  @observable status = { state: "inactive", error: {} };
  @observable error = {};

  @observable
  breadcrumbs: string[] = [];

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
}
