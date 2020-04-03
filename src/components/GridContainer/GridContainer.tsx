import React from "react";
import styled from "styled-components";
import Container from "../Container/Container";

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: 290px 1fr;
  grid-template-areas:
    "breadcrumbs breadcrumbs"
    "aside list"
    "aside list";
  margin-top: 0;
`;

const GridContainer: React.FC = ({ children, ...other }) => <StyledContainer {...other}>{children}</StyledContainer>;

export default GridContainer;
