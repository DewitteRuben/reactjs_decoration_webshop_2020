import React from "react";
import styled from "styled-components";
import ItemCard, { ItemCardSkeleton } from "../ItemCard/ItemCard";
import { IShopItem } from "../../io-ts-types";

interface IProps {
  items: IShopItem[];
  loading?: boolean;
  amount?: number;
}

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-row-gap: 30px;
  grid-column-gap: 10px;
  justify-items: center;
  grid-area: list;
`;

const ItemList: React.FC<IProps> = ({ items, loading, amount }) => {
  if (loading && amount) {
    const skeleton = Array(amount)
      .fill(0)
      .map((_, i) => <ItemCardSkeleton key={`feed-skeleton-${i}`} />);
    return <ItemContainer>{skeleton}</ItemContainer>;
  }

  return (
    <ItemContainer>
      {items?.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </ItemContainer>
  );
};

export default ItemList;
