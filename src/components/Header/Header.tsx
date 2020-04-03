import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Searchbar from "../Searchbar/Searchbar";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import NavbarIcon from "../NavbarIcon/NavbarIcon";
import UserDropdown from "../UserDropdown/UserDropdown";
import Typography from "../Typography/Typography";
import Container from "../Container/Container";

const StyledHeader = styled(Container)`
  align-items: center;
  height: ${rem(95)};
`;

const HeaderIconsContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

const StyledTypography = styled(Typography)`
  position: absolute;
  left: 50%;
`;

interface IProps {
  title?: string;
}

const Header: React.FC<IProps> = ({ title = "Deco World" }) => {
  return (
    <StyledHeader>
      <Searchbar />
      <StyledTypography fontSize="larger" fontWeight="bold" as="h2">
        {title}
      </StyledTypography>
      <HeaderIconsContainer>
        <UserDropdown />
        <NavbarIcon name="heart" />
        <ShoppingCart />
      </HeaderIconsContainer>
    </StyledHeader>
  );
};

export default Header;
