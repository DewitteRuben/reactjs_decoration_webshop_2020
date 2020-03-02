import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 290px 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas: 
    "breadcrumbs breadcrumbs"
    "aside list"
    "aside list";
`;

const Container: React.FC = ({ children }) => <StyledContainer>{children}</StyledContainer>;

export default Container;
