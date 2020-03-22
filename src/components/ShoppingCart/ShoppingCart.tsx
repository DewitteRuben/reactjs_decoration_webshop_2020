import React from "react";
import Card from "../Card/Card";
import styled from "styled-components";
import { rem } from "polished";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import { useStores } from "../../hooks/use-stores";
import { IShopItem } from "../../store/ItemStore";
import { observer } from "mobx-react";
import { CartStore } from "../../store/CartStore";
import NavbarIcon from "../NavbarIcon/NavbarIcon";
import useClickOutside from "../../hooks/use-clickoutside";

const ShoppingCartContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ShoppingCartCard = styled(Card)`
  padding: 10px 0 10px 0;
  background-color: ${props => props.theme.white};
  position: absolute;
  right: ${rem(-100)};
  z-index: 20;
  min-width: ${rem(250)};
`;

const Headline = styled.span`
  display: inline-block;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  width: 100%;
`;

const Seperator = styled.div`
  border-bottom: 1px solid ${props => props.theme.border};
`;

const handleOnDelete = (cartStore: CartStore) => (item: IShopItem) => {
  cartStore.removeItem(item._id);
};

const renderItems = (items: IShopItem[], cartStore: CartStore) => {
  return items.map(item => (
    <React.Fragment key={item._id}>
      <Seperator />
      <ShoppingCartItem onDelete={handleOnDelete(cartStore)} item={item} />
    </React.Fragment>
  ));
};

const ShoppingCart: React.FC = observer(() => {
  const { cartStore } = useStores();
  const [isVisible, setVisibility] = React.useState(false);
  const toggler = React.useRef<HTMLImageElement | null>(null);

  const handleClickOutside = () => {
    setVisibility(false);
  };

  const toggleVisbility = () => {
    setVisibility(prev => !prev);
  };

  const containerRef = useClickOutside<HTMLDivElement>(handleClickOutside, toggler.current);
  return (
    <ShoppingCartContainer>
      <NavbarIcon ref={toggler} onClick={toggleVisbility} name="cart" />
      {isVisible && (
        <ShoppingCartCard ref={containerRef}>
          <Headline>{cartStore.items.length ? "Your shopping cart" : "Your shopping cart is empty."}</Headline>
          {renderItems(cartStore.items, cartStore)}
        </ShoppingCartCard>
      )}
    </ShoppingCartContainer>
  );
});

export default ShoppingCart;
