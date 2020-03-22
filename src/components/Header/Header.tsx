import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Searchbar from "../Searchbar/Searchbar";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import NavbarIcon from "../NavbarIcon/NavbarIcon";

const Title = styled.h2`
  margin: 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: ${rem(95)};
`;

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ title = "Deco World" }) => {
  return (
    <StyledHeader>
      <Searchbar />
      <Title>{title}</Title>
      <div>
        <NavbarIcon name="heart" />
        <ShoppingCart />
        <NavbarIcon name="user" />
      </div>
    </StyledHeader>
  );
};

export default Header;
