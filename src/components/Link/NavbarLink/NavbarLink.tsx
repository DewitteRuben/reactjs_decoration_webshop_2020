import styled from "styled-components";
import RouterLink from "../RouterLink/RouterLink";
import { lighten } from "polished";
import { getFontWeight } from "../../Typography/Typography";

interface IAnchorProps {
  selected: boolean;
}

export default styled(RouterLink)<IAnchorProps>`
  text-decoration: none;
  color: ${props => (props.selected ? lighten(0.5, props.theme.black) : props.theme.black)};
  padding: 5px 15px;
  background-color: ${props => (props.selected ? props.theme.opacityGray : props.theme.white)};
  border-radius: 20px;
  font-weight: ${getFontWeight("bold")};

  &:hover {
    border: none;
    color: ${props => lighten(0.5, props.theme.black)};
    background-color: ${props => props.theme.opacityGray};
    border-radius: 20px;
  }
`;
