import React from "react";
import { CartStore } from "../../store/CartStore";
import { IShopItem } from "../../io-ts-types";
import styled from "styled-components";
import Card from "../Card/Card";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import Typography from "../Typography/Typography";
import { useStores } from "../../hooks/use-stores";

const handleOnDelete = (cartStore: CartStore) => (item: IShopItem) => {
  cartStore.removeItem(item._id);
};

const ShopItemContainer = styled(Card)`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ShoppingCartContainer = styled.div`
  padding: 10px 20px;
`;

const CheckoutCart: React.FC = () => {
  const { cartStore } = useStores();
  return (
    <ShopItemContainer as="ul">
      {cartStore.items.map(item => (
        <ShoppingCartItem key={item.id} item={item} onDelete={handleOnDelete(cartStore)} />
      ))}
      <ShoppingCartContainer>
        <Typography fullWidth align="center" fontWeight="bold" fontSize="large">
          {`Total: ${cartStore.totalPrice}`}
        </Typography>
      </ShoppingCartContainer>
    </ShopItemContainer>
  );
};

export default CheckoutCart;
