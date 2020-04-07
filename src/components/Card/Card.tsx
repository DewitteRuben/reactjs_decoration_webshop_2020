import { rem } from "polished";
import styled, { css } from "styled-components";

export const PrimaryBoxShadowMixin = css`
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.1);
`;

const Card = styled.div`
  background-color: ${props => props.theme.white};
  padding: ${rem(20)};
  ${PrimaryBoxShadowMixin}
`;

export default Card;
