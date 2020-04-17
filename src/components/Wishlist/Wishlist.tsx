import React from "react";
import { useStores } from "../../hooks/use-stores";
import { useHistory } from "react-router-dom";
import Dropdown, { closeDropdownCurry } from "../Dropdown/Dropdown";
import { getLocationFromShopItem } from "../../utils/navigation";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import useClickOutside from "../../hooks/use-clickoutside";
import Badge from "../Badge/Badge";
import ButtonUnstyled from "../ButtonUnstyled/ButtonUnstyled";
import NavbarIcon from "../NavbarIcon/NavbarIcon";
import { WishlistStore } from "../../store/WishlistStore";
import { IShopItem } from "../../io-ts-types";
import styled from "styled-components";
import Typography from "../Typography/Typography";
import { observer } from "mobx-react";

const handleOnDelete = (wishlistStore: WishlistStore) => (item: IShopItem) => {
  wishlistStore.removeItem(item.id);
};

const WishlistContainer = styled.div`
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

const Wishlist: React.FC = observer(() => {
  const { wishlistStore } = useStores();
  const history = useHistory();
  const [isVisible, setVisibility] = React.useState(false);
  const toggler = React.useRef<HTMLButtonElement | null>(null);
  const closeDropdownCallback = closeDropdownCurry(setVisibility);
  const closeDropdown = closeDropdownCallback();

  const toggleVisbility = () => {
    setVisibility(prev => !prev);
  };

  const renderItems = () => {
    return wishlistStore.items.map(item => {
      const navigateToItem = () => {
        const location = getLocationFromShopItem(item);
        history.push(location);
      };
      return (
        <ShoppingCartItem onClick={navigateToItem} key={item.id} onDelete={handleOnDelete(wishlistStore)} item={item} />
      );
    });
  };

  const containerRef = useClickOutside<HTMLUListElement>(closeDropdown, toggler.current);

  return (
    <WishlistContainer>
      {wishlistStore.hasItems && <Badge>{wishlistStore.items.length}</Badge>}
      <ButtonUnstyled ref={toggler} onClick={toggleVisbility}>
        <NavbarIcon name="heart" />
      </ButtonUnstyled>
      <StyledDropdown display={isVisible} ref={containerRef}>
        <Headline fontWeight="bold" align="center">
          {wishlistStore.hasItems ? "Your wishlist" : "Your wishlist is empty."}
        </Headline>
        {renderItems()}
        {wishlistStore.hasItems && (
          <Container>
            <Total fontWeight="bold" color="black">
              <span>Total price:</span>
              <span>{wishlistStore.totalPrice}</span>
            </Total>
          </Container>
        )}
      </StyledDropdown>
    </WishlistContainer>
  );
});

export default Wishlist;
