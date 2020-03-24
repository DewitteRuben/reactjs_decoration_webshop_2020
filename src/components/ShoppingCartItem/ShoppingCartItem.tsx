import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { IShopItem } from "../../io-ts-types";

interface IShoppingCartItemProps {
  item: IShopItem;
  onDelete?: (item: IShopItem) => void;
}

const DeleteButton = styled.span`
  position: absolute;
  top: 5px;
  right: 13px;
  user-select: none;
  cursor: pointer;
`;

const ShoppingCartItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  width: ${rem(240)};

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const ShoppingCartItemImage = styled.img`
  border-radius: 20%;
  width: ${rem(55)};
`;

const ShoppingCartItemPrice = styled.span`
  font-weight: bold;
  margin-top: ${rem(5)};
`;

const ShoppingCartItemName = styled.span`
  text-transform: uppercase;
`;

const DescriptionContainer = styled.div`
  width: ${rem(110)};
  display: flex;
  flex-direction: column;
  margin-left: ${rem(20)};
`;

const ShoppingCartItemDescription = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${props => props.theme.darkGray};
`;

const ActionContainer = styled.div`
  position: relative;
`;

const handleOnDelete = (item: IShopItem, onDelete?: (item: IShopItem) => void) => () => {
  if (onDelete) {
    onDelete(item);
  }
};

const ShoppingCartItem: React.FC<IShoppingCartItemProps> = ({ item, onDelete }) => {
  return (
    <ActionContainer>
      <ShoppingCartItemContainer>
        <ShoppingCartItemImage src={item.images?.small} alt={item.name} />
        <DescriptionContainer>
          <ShoppingCartItemName>{item.name}</ShoppingCartItemName>
          <ShoppingCartItemDescription>{item.description}</ShoppingCartItemDescription>
          <ShoppingCartItemPrice>€{item.price}</ShoppingCartItemPrice>
        </DescriptionContainer>
      </ShoppingCartItemContainer>
      <DeleteButton onClick={handleOnDelete(item, onDelete)}>X</DeleteButton>
    </ActionContainer>
  );
};

export default ShoppingCartItem;
