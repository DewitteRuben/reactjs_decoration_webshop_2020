import React from "react";
import styled from "styled-components";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import UserDropdown from "../UserDropdown/UserDropdown";

const HeaderIconsContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const HeaderIcons = () => {
  return (
    <HeaderIconsContainer>
      <UserDropdown />
      <ShoppingCart />
    </HeaderIconsContainer>
  );
};

export default HeaderIcons;
