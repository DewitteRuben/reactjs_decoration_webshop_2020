import { reaction } from "mobx";
import { useObserver } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/use-stores";
import ItemList from "../ItemList/ItemList";
import { ICategoryQuery } from "../../store/ItemStore";

const Feed: React.FC = () => {
  const { itemStore } = useStores();
  const { category, subCategory, itemCategory, specificCategory } = useParams();
  const query: ICategoryQuery = React.useMemo(
    () => ({
      category,
      subCategory,
      itemCategory,
      specificCategory
    }),
    [category, subCategory, itemCategory, specificCategory]
  );

  React.useEffect(() => {
    const disposer = reaction(
      () => itemStore.categories || itemStore.filters,
      () => {
        itemStore.fetchItems();
      }
    );

    return () => {
      disposer();
    };
  }, [itemStore]);

  React.useEffect(() => {
    itemStore.setCategories(query);
  }, [itemStore, query]);

  return useObserver(() => <ItemList items={itemStore.getItems()} />);
};

export default Feed;
