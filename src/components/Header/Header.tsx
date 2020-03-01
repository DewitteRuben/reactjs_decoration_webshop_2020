import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Icon from "../Icon/Icon";
import Searchbar from "../Searchbar/Searchbar";

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

const StyledIcon = styled(Icon)`
  margin-left: 10px;
  margin-right: 10px;
`;

const Header: React.FC<IProps> = ({ title = "Deco World" }) => {
  return (
    <StyledHeader>
      <Searchbar />
      <Title>{title}</Title>
      <div>
        <StyledIcon name="heart" />
        <StyledIcon name="cart" />
        <StyledIcon name="user" />
      </div>
    </StyledHeader>
  );
};

export default Header;
