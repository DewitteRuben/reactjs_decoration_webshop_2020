import flatten from "flat";
import { action, observable } from "mobx";
import itemData from "../data/items.json";

export type Categories = "decoration";

export type Subcategories = "vase-and-flowers";

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

export default class ItemStore {
  @observable
  items = itemData.categories;

  @action
  getItems() {
    return this.items;
  }

  @action
  getAllItems(cat?: string, subcat?: string, itemCategory?: string, specificCategory?: string) {
    let items: any = [];

    if (cat && !subcat) {
      items = this.items[cat as Categories];
    } else if (cat && subcat && !itemCategory) {
      items = this.items[cat as Categories].subcategories[subcat as Subcategories];
    } else if (cat && subcat && itemCategory && !specificCategory) {
      return this.items[cat as Categories].subcategories[subcat as Subcategories][itemCategory as ItemCategories];
    } else if (cat && subcat && itemCategory && specificCategory) {
      return this.items[cat as Categories].subcategories[subcat as Subcategories][itemCategory as ItemCategories];
    }

    if (!items) return items;

    const flattedItems: { [key: string]: any } = flatten(items, { safe: true });
    const keys = Object.keys(flattedItems);

    return keys.flatMap(key => flattedItems[key]).filter(obj => Object.keys(obj).length);
  }
}
