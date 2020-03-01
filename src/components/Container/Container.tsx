import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
`;

const Container: React.FC = ({ children }) => <StyledContainer>{children}</StyledContainer>;

export default Container;