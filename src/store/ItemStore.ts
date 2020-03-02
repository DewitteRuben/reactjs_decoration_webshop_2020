import { observable } from "mobx";
import itemData from "../data/items.json";

export default class ItemStore {
  @observable
  items = itemData.categories.decoration.subcategories["vase-and-flowers"];

  @observable
  filteredItems = [];

  getAllItems() {
    return this.items;
  }
}
