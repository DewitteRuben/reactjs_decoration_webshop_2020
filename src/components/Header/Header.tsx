import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Searchbar from "../Searchbar/Searchbar";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import NavbarIcon from "../NavbarIcon/NavbarIcon";
import UserDropdown from "../UserDropdown/UserDropdown";
import Typography from "../Typography/Typography";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: ${rem(95)};
`;

const HeaderIconsContainer = styled.div`
  display: flex;
`;

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ title = "Deco World" }) => {
  return (
    <StyledHeader>
      <Searchbar />
      <Typography fontSize="larger" fontWeight="bold" as="h2">
        {title}
      </Typography>
      <HeaderIconsContainer>
        <UserDropdown />
        <NavbarIcon name="heart" />
        <ShoppingCart />
      </HeaderIconsContainer>
    </StyledHeader>
  );
};

export default Header;
