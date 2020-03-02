import { action, observable } from "mobx";
import itemData from "../data/items.json";

export type Categories = "decoration";

export type Subcategories = "vase-and-flowers";

export interface Images {
  small: string;
  medium: string;
  larqe: string;
  thumb: string;
}

export interface ItemSubcategory {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  price: number;
  stateOfProduct: string;
  images: Images;
}

export default class ItemStore {
  @observable
  items = itemData.categories;

  @action
  getItems() {
    return this.items;
  }

  @action
  getAllItems(cat?: string, subcat?: string) {
    let items: ItemSubcategory[] = [];
    if (cat && subcat) {
      items = this.items[cat as Categories].subcategories[subcat as Subcategories];
    }
    return items;
  }
}
