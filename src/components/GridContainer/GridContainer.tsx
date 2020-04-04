import React from "react";
import styled from "styled-components";
import Container from "../Container/Container";

const StyledContainer = styled(Container)`
  display: grid;
  margin-top: 0;

  grid-template-columns: auto 1fr;
  grid-template-areas:
    "aside breadcrumbs"
    "aside list"
    "aside list";

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    grid-template-areas:
      "aside"
      "aside"
      "breadcrumbs"
      "list"
      "list";
  }
`;

const GridContainer: React.FC = ({ children, ...other }) => <StyledContainer {...other}>{children}</StyledContainer>;

export default GridContainer;
