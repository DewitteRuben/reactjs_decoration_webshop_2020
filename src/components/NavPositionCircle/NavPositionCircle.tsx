import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import themes from "../../styles/theme";

const StyledCircle = styled.div`
  width: ${rem(5)};
  height: ${rem(5)};
  border-radius: 50%;
  background-color: ${props => themes.primary.darkGray};
`;

const NavPositionCircle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return <StyledCircle className={className} />;
};

export default NavPositionCircle;
