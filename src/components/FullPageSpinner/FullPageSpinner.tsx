import React from "react";
import Container from "../Container/Container";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { getColors } from "../Typography/Typography";

const StyledContainer = styled(Container)`
  flex: 1;
  min-height: 100%;
  justify-content: center;
  align-items: center;
`;

const FullPageSpinner: React.FC = () => {
  return (
    <StyledContainer>
      <PulseLoader color={getColors("black")} size={15} />
    </StyledContainer>
  );
};

export default FullPageSpinner;
