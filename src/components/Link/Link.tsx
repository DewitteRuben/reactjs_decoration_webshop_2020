import styled from "styled-components";
import { FontSizes, getFontSize, Colors, getColors } from "../Typography/Typography";

export interface ILinkProps {
  fontSize?: FontSizes;
  color?: Colors;
}

export default styled.a<ILinkProps>`
  text-decoration: none;
  color: ${props => (props.color ? getColors(props.color) : getColors("black"))};
  font-size: ${props => (props.fontSize ? getFontSize(props.fontSize) : getFontSize("normal"))};

  &:hover {
    border-bottom: 1px solid ${props => (props.color ? getColors(props.color) : getColors("black"))};
  }
`;
