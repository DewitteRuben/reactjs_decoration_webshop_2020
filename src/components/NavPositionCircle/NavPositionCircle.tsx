import { rem } from "polished";
import React from "react";
import styled from "styled-components";

const StyledCircle = styled.div`
  width: ${rem(5)};
  height: ${rem(5)};
  border-radius: 50%;
  background-color: ${props => props.theme.darkGray};
`;

const NavPositionCircle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  return <StyledCircle {...props} />;
};

export default NavPositionCircle;
