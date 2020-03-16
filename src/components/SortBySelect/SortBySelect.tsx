import React from "react";
import Select, { IItem, ISelectProps } from "../Select/Select";
import { useStores } from "../../hooks/use-stores";
import ItemStore from "../../store/ItemStore";

export enum SortTypes {
  NONE = "",
  POPULAR = "popular",
  HIGHEST_PRICE = "highestPrice",
  LOWEST_PRICE = "lowestPrice",
  NEWEST = "newest"
}

const items: IItem[] = [
  { name: "Most Popular", value: SortTypes.POPULAR },
  { name: "Highest price", value: SortTypes.HIGHEST_PRICE },
  { name: "Lowest price", value: SortTypes.LOWEST_PRICE },
  { name: "Newest", value: SortTypes.NEWEST }
];

const handleSortTypeChange = (itemStore: ItemStore) => (item: IItem) => {
  const value = item.value ?? SortTypes.NONE;
  itemStore.setSortType(value);
};

const SortBySelect: React.FC = () => {
  const { itemStore } = useStores();

  return <Select items={items} onValueChange={handleSortTypeChange(itemStore)} clear label="Sort" />;
};

export default SortBySelect;
