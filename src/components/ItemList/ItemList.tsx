import React from "react";
import styled from "styled-components";
import ItemCard from "../ItemCard/ItemCard";
import { ShopItem } from "../../store/ItemStore";

interface IProps {
  items: ShopItem[];
}

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-row-gap: 30px;
  grid-column-gap: 10px;
  justify-items: center;
  grid-area: list;
`;

const ItemList: React.FC<IProps> = ({ items }) => {
  return (
    <ItemContainer>
      {items?.map(e => (
        <ItemCard
          price={e.price}
          currency="€"
          state={e.stateOfProduct}
          description={e.description}
          key={e._id}
          title={e.name}
          image={e.images.thumb}
        />
      ))}
    </ItemContainer>
  );
};

export default ItemList;
