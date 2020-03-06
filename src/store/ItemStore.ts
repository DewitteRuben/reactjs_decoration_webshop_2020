import { flow, observable } from "mobx";

export type Categories = "decoration";

export type Subcategories = "vases-and-flowers";

export type ItemCategories = "vases" | "flowers";

export interface Images {
  small: string;
  medium: string;
  larqe: string;
  thumb: string;
}

export interface Item {
  id: string;
  category: string;
  subcategory: string;
  item_category: string;
  specific_category: string;
  name: string;
  description: string;
  price: number;
  stateOfProduct: string;
  images: Images;
}

interface IQuery {
  [key: string]: string | undefined;
  category?: string;
  subCategory?: string;
  itemCategory?: string;
  specificCategory?: string;
}

export default class ItemStore {
  @observable
  items = [];

  @observable status = { state: "inactive", error: {} };
  @observable error = {};

  @observable
  breadcrumbs: string[] = [];

  fetchItems = flow(function*(this: ItemStore, query: IQuery) {
    const filters = Object.keys(query)
      .filter(key => query[key])
      .map(key => `${key}=${query[key]}`)
      .join("&");

    this.items = [];
    this.status.state = "pending";
    try {
      const promiseItems = yield fetch(`http://localhost:3000/api/shopitem?${filters}`);
      const fetchedItems = yield promiseItems.json();
      this.items = fetchedItems;
      this.status.state = "done";
    } catch (error) {
      this.status = { state: "error", error };
    }
  });
}
