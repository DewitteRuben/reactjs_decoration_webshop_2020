import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../hooks/use-stores";
import ItemList from "../ItemList/ItemList";

const Feed: React.FC = () => {
  const { itemStore } = useStores();
  const { category, subCategory, itemCategory, specificCategory } = useParams();
  const items = itemStore.getAllItems(category, subCategory, itemCategory, specificCategory);

  return <ItemList items={items} />;
};

export default Feed;
