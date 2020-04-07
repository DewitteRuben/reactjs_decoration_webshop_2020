import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Searchbar from "../Searchbar/Searchbar";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import UserDropdown from "../UserDropdown/UserDropdown";
import Typography from "../Typography/Typography";
import Container from "../Container/Container";

const StyledHeader = styled(Container)`
  height: ${rem(95)};

  align-items: center;
  margin-top: 0;
`;

const HeaderIconsContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
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
        <ShoppingCart />
      </HeaderIconsContainer>
    </StyledHeader>
  );
};

export default Header;
