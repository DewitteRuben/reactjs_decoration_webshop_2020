import React from "react";
import { useStores } from "../../hooks/use-stores";
import ItemList from "../ItemList/ItemList";

const Feed: React.FC = () => {
  const { itemStore } = useStores();
  return <ItemList items={itemStore.getAllItems()} />;
};

export default Feed;
