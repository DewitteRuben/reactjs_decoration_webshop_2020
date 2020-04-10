import { isRight } from "fp-ts/lib/Either";
import { IShopItemDataRuntime, IShopItemData } from "./../io-ts-types/index";
import { flow, observable, action, computed } from "mobx";
import { getItemsWithFilters } from "../api/api";
import { SortTypes } from "../components/SortBySelect/SortBySelect";
import { getSortedItems } from "../utils/sort";
import _ from "lodash";
import { IParams } from "../api/api";
import { dateReviver } from "../utils/string";

export type Categories = "decoration";

export type Subcategories = "vases-and-flowers";

export type ItemCategories = "vases" | "flowers";

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

  @observable amount = 0;
  @observable status = { state: "inactive", error: {} };
  @observable error = {};

  @observable
  filters: FiltersMap<string | number> = {};

  @observable
  categories: ICategoryQuery = {};

  @action
  fetchItems = flow(function*(this: ItemStore) {
    const categories: IParams[] = Object.keys(this.categories).map((key: string) => ({
      value: this.categories[key],
      key
    }));

    const queryParams = [...categories, ...this.filters2Params(this.filters)];

    try {
      const response = yield getItemsWithFilters([...queryParams, { key: "amount", value: "true" }]);
      const { amount } = yield response.json();
      this.setAmount(amount);

      this.status.state = "pending";
      const promiseItems = yield getItemsWithFilters(queryParams);
      const shopItemData = yield promiseItems.text();
      const parsedShopItemData = JSON.parse(shopItemData, dateReviver);
      if (isRight(IShopItemDataRuntime.decode(parsedShopItemData))) {
        this.shopItemData = parsedShopItemData;
      }
      this.status.state = "done";
    } catch (error) {
      this.status = { state: "error", error };
    }
  });

  @action
  fetchItemsByUserId = flow(function*(this: ItemStore, userId: string) {
    const idParam = { key: "userId", value: userId };

    try {
      const response = yield getItemsWithFilters([idParam, { key: "amount", value: "true" }]);
      const { amount } = yield response.json();
      this.setAmount(amount);

      this.status.state = "pending";
      const itemsResponse = yield getItemsWithFilters([idParam]);
      const JSONString = yield itemsResponse.text();
      const shopItemData = JSON.parse(JSONString, dateReviver);
      if (isRight(IShopItemDataRuntime.decode(shopItemData))) {
        this.shopItemData = shopItemData;
      }
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
  setAmount = (amount: number) => {
    this.amount = amount;
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
    this.categories = { ...categories };
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

  @action
  clear() {
    this.status = { state: "inactive", error: {} };
    this.shopItemData.items = [];
    this.amount = 0;
  }
}
