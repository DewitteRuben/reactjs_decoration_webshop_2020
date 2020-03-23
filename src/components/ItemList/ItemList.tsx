import React from "react";
import styled from "styled-components";
import ItemCard from "../ItemCard/ItemCard";
import { IShopItem } from "../../store/ItemStore";

interface IProps {
  items: IShopItem[];
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
      {items?.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </ItemContainer>
  );
};

export default ItemList;
