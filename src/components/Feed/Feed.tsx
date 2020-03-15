import { autorun } from "mobx";
import { useObserver } from "mobx-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/use-stores";
import ItemList from "../ItemList/ItemList";

const Feed: React.FC = () => {
  const { itemStore } = useStores();
  const { category, subCategory, itemCategory, specificCategory } = useParams();
  const query = React.useMemo(
    () => ({
      category,
      subCategory,
      itemCategory,
      specificCategory
    }),
    [category, subCategory, itemCategory, specificCategory]
  );

  React.useEffect(
    () =>
      autorun(() => {
        itemStore.fetchItems(query);
      }),
    [itemStore, query]
  );

  return useObserver(() => <ItemList items={itemStore.getItems()} />);
};

export default Feed;
