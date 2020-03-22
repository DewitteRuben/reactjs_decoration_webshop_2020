import styled from "styled-components";
import Icon from "../Icon/Icon";
import { darken } from "polished";

const NavbarIcon = styled(Icon)`
  padding: 6px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    background-color: ${props => darken(0.1)(props.theme.white)};
  }
`;

export default NavbarIcon;
