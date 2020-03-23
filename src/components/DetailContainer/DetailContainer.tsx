import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const DetailContainer: React.FC = ({ children }) => <StyledContainer>{children}</StyledContainer>;

export default DetailContainer;
