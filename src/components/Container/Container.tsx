import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 25px;
`;

const Container: React.FC = ({ children, ...other }) => <StyledContainer {...other}>{children}</StyledContainer>;

export default Container;
