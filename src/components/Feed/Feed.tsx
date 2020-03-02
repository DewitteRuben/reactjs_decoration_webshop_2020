import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/use-stores";
import ItemList from "../ItemList/ItemList";

const Feed: React.FC = () => {
  const { itemStore } = useStores();
  const { category, subcategory } = useParams();

  return <ItemList items={itemStore.getAllItems(category, subcategory)} />;
};

export default Feed;
