import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Icon from "../Icon/Icon";

const StyledSearchbar = styled.div`
  display: flex;
  align-items: center;
  width: ${rem(300)};
  background-color: ${props => props.theme.gray};
  padding: ${rem(8)};
  border-radius: ${rem(25)};
`;

const Input = styled.input`
  background: none;
  border: none;
  padding: 0 ${rem(10)};
  width: 80%;
  font-size: ${rem(17)};

  &:focus {
    outline: none;
  }
`;

const Searchbar: React.FC = () => {
  return (
    <StyledSearchbar>
      <Icon name="search" size={35} />
      <Input type="text" placeholder="Search" name="search" id="search" />
    </StyledSearchbar>
  );
};

export default Searchbar;
