import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { IShopItem } from "../../io-ts-types";
import DropdownItem, { IDropdownItemProps } from "../Dropdown/DropdownItem/DropdownItem";

interface IShoppingCartItemProps extends IDropdownItemProps {
  item: IShopItem;
  onDelete?: (item: IShopItem) => void;
}

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
  width: ${rem(155)};
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

const handleOnDelete = (item: IShopItem, onDelete?: (item: IShopItem) => void) => () => {
  if (onDelete) {
    onDelete(item);
  }
};

const ShoppingCartItem: React.FC<IShoppingCartItemProps> = ({ item, onDelete, ...props }) => {
  const firstImage = item.images[0];
  return (
    <DropdownItem actionComponent="X" onActionClick={handleOnDelete(item, onDelete)} {...props}>
      <ShoppingCartItemImage src={firstImage.small} alt={item.name} />
      <DescriptionContainer>
        <ShoppingCartItemName>{item.name}</ShoppingCartItemName>
        <ShoppingCartItemDescription>{item.description}</ShoppingCartItemDescription>
        <ShoppingCartItemPrice>€{item.price}</ShoppingCartItemPrice>
      </DescriptionContainer>
    </DropdownItem>
  );
};

export default ShoppingCartItem;
