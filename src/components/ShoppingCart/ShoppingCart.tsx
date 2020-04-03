import React from "react";
import styled from "styled-components";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
import { CartStore } from "../../store/CartStore";
import NavbarIcon from "../NavbarIcon/NavbarIcon";
import useClickOutside from "../../hooks/use-clickoutside";
import { IShopItem } from "../../io-ts-types";
import Dropdown from "../Dropdown/Dropdown";
import { useHistory } from "react-router-dom";
import { getLocationFromShopItem } from "../../utils/navigation";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import Typography from "../Typography/Typography";
import ButtonUnstyled from "../ButtonUnstyled/ButtonUnstyled";

const ShoppingCartContainer = styled.div`
  position: relative;
`;

const StyledDropdown = styled(Dropdown)`
  width: 280px;
`;

const Headline = styled(Typography)`
  padding: 10px 20px;
  box-sizing: border-box;
  width: 100%;
`;

const Container = styled.div`
  padding: 10px 20px;
  width: inherit;
  box-sizing: border-box;
`;

const Total = styled(Typography)`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const handleOnDelete = (cartStore: CartStore) => (item: IShopItem) => {
  cartStore.removeItem(item._id);
};

const ShoppingCart: React.FC = observer(() => {
  const { cartStore } = useStores();
  const history = useHistory();
  const [isVisible, setVisibility] = React.useState(false);
  const toggler = React.useRef<HTMLButtonElement | null>(null);

  const handleClickOutside = () => {
    setVisibility(false);
  };

  const toggleVisbility = () => {
    setVisibility(prev => !prev);
  };

  const renderItems = () => {
    return cartStore.items.map(item => {
      const navigateToItem = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        const location = getLocationFromShopItem(item);
        history.push(location);
      };
      return <ShoppingCartItem onClick={navigateToItem} key={item._id} onDelete={handleOnDelete(cartStore)} item={item} />;
    });
  };

  const containerRef = useClickOutside<HTMLUListElement>(handleClickOutside, toggler.current);

  return (
    <ShoppingCartContainer>
      {cartStore.hasItem && <Badge>{cartStore.items.length}</Badge>}
      <ButtonUnstyled ref={toggler} onClick={toggleVisbility}>
        <NavbarIcon name="cart" />
      </ButtonUnstyled>
      <StyledDropdown display={isVisible} ref={containerRef}>
        <Headline fontWeight="bold" align="center">
          {cartStore.hasItem ? "Your shopping cart" : "Your shopping cart is empty."}
        </Headline>
        {renderItems()}
        <Container>
          {cartStore.hasItem && (
            <Total fontWeight="bold" color="black">
              <span>Total price:</span>
              <span>{cartStore.totalPrice}</span>
            </Total>
          )}
          <StyledButton>Checkout</StyledButton>
        </Container>
      </StyledDropdown>
    </ShoppingCartContainer>
  );
});

export default ShoppingCart;
