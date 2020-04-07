import styled from "styled-components";
import { getFontSize } from "../Typography/Typography";

export default styled.input`
  background-color: ${props => props.theme.white};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.black};
  font-size: ${getFontSize("normal")};
  max-height: 50px;
  padding: 10px 15px;
  margin: 0;
  box-sizing: border-box;

  transition-property: border, box-shadow;
  transition-timing-function: ease-in-out;
  transition-duration: 250ms;
  width: 100%;

  &:focus {
    border: 1px solid #00cdcb;
    box-shadow: 0 0 5px 0 rgba(0, 205, 203, 0.15);
  }

  &::placeholder {
    color: ${props => props.theme.placeholder};
    opacity: 0.5;
  }
`;
