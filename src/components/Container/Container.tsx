import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Container: React.FC = ({ children, ...other }) => <StyledContainer {...other}>{children}</StyledContainer>;

export default Container;
