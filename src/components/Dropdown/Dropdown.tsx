import styled, { css } from "styled-components";
import { rem } from "polished";

interface IDropdownProps {
  display?: boolean;
  hideLastSeperator?: boolean;
}

const HideEndSeperator = css`
  li:last-of-type {
    border-bottom: none;
  }
`;

const Dropdown = styled.ul<IDropdownProps>`
  position: absolute;
  display: ${props => (props.display ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: ${rem(170)};

  padding: 0;
  margin: 0;

  z-index: 10;
  list-style-type: none;

  transform: translateX(-45%);

  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.1);

  background-color: ${props => props.theme.white};

  user-select: none;

  ${props => props.hideLastSeperator && HideEndSeperator}
`;

export default Dropdown;
