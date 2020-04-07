import styled from "styled-components";
import { rem, lighten } from "polished";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  background-color: ${props => props.theme.white};
  padding: ${rem(10)} ${rem(20)};

  border: 1px solid ${props => props.theme.darkGray};
  border-radius: 4px;

  text-align: center;
  color: ${props => props.theme.black};

  font-weight: 700;
  font-size: ${rem(18)};

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
