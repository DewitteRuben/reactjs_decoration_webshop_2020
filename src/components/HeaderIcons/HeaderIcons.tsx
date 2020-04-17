import React from "react";
import styled from "styled-components";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import UserDropdown from "../UserDropdown/UserDropdown";
import ButtonNewItem from "../ButtonNewItem/ButtonNewItem";
import Wishlist from "../Wishlist/Wishlist";

const HeaderIconsContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const HeaderIcons = () => {
  return (
    <HeaderIconsContainer>
      <ButtonNewItem />
      <UserDropdown />
      <Wishlist />
      <ShoppingCart />
    </HeaderIconsContainer>
  );
};

export default HeaderIcons;
