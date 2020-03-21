import { rem } from "polished";
import styled from "styled-components";

const Card = styled.div`
  padding: ${rem(20)};
  box-shadow: 0 ${rem(14)} ${rem(28)} rgba(0, 0, 0, 0.25), 0 ${rem(10)} ${rem(10)} rgba(0, 0, 0, 0.22);
`;

export default Card;
