import styled from "styled-components";
import { rem, lighten } from "polished";

const Button = styled.button`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.darkGray};
  background-color: initial;
  color: ${props => props.theme.black};
  font-weight: 700;
  font-size: ${rem(18)};
  padding: ${rem(10)} ${rem(20)};
  margin: ${rem(10)} 0;
  position: relative;
  box-shadow: 0 2px ${props => lighten(0.2)(props.theme.darkGray)};

  &:hover {
    cursor: pointer;
    box-shadow: 0 1px ${props => lighten(0.2)(props.theme.darkGray)};
    top: 1px;
  }

  &:active {
    box-shadow: 0 0px ${props => lighten(0.2)(props.theme.darkGray)};

    top: 3px;
  }
`;

export default Button;
