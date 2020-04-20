import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 25px auto;

  width: 100%;
  max-width: 1440px;
`;

const Container: React.FC = ({ children, ...other }) => <StyledContainer {...other}>{children}</StyledContainer>;

export default Container;
