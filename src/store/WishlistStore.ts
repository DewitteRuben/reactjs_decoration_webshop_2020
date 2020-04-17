import { observable, action, computed } from "mobx";
import _ from "lodash";
import { IShopItem } from "../io-ts-types";
import { persistWishlist, loadWishlist } from "../persistence/localstorage";
import { updateWishlistCount } from "../api/api";

export class WishlistStore {
  @observable
  items: IShopItem[] = [];

  constructor() {
    const persistedWishlist = loadWishlist();
    if (persistedWishlist) {
      this.items = persistedWishlist;
    }
  }

  @action
  addItem = (item: IShopItem) => {
    const hasItem = this.items.findIndex(itemInList => itemInList.id === item.id) >= 0;
    if (!hasItem) {
      this.items.push(item);
      updateWishlistCount(item.id);
    }
    persistWishlist(this.items);
  };

  @action
  removeItem = (id: string) => {
    const hasItem = this.items.findIndex(itemInList => itemInList.id === id) >= 0;
    if (hasItem) {
      updateWishlistCount(id, true);
    }
    _.remove(this.items, item => item.id === id);
    persistWishlist(this.items);
  };

  @action
  toggle = (item: IShopItem) => {
    const hasItem = this.items.findIndex(itemInList => itemInList.id === item.id) >= 0;
    if (hasItem) {
      this.removeItem(item.id);
    } else {
      this.addItem(item);
    }
  };

  @computed
  get totalPrice() {
    if (!this.items.length) return "0.00";
    return this.items
      .map(item => item.price)
      .reduce((prev, cur) => prev + cur)
      .toFixed(2);
  }

  @computed
  get hasItems() {
    return this.items.length > 0;
  }

  hasItem(id: string) {
    return computed(() => this.items.findIndex(itemInList => itemInList.id === id) >= 0).get();
  }
}
