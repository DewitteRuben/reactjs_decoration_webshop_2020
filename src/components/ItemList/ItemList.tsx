import React from "react";
import styled from "styled-components";
import ItemCard from "../ItemCard/ItemCard";

export interface Images {
  small: string;
  medium: string;
  larqe: string;
  thumb: string;
}

export interface ListItem {
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  price: number;
  stateOfProduct: string;
  images: Images;
}

interface IProps {
  items: ListItem[];
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
