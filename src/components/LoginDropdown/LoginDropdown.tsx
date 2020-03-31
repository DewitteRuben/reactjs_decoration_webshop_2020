import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import NavbarIcon from "../NavbarIcon/NavbarIcon";
import useClickOutside from "../../hooks/use-clickoutside";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import ButtonRouter from "../ButtonRouter/ButtonRouter";

const StyledDropdown = styled(Card)`
  z-index: 10;
  position: absolute;
  transform: translateX(-45%);
  padding: 10px 0 10px 0;
  background-color: ${props => props.theme.white};
  min-width: ${rem(250)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.span`
  display: inline-block;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const LoginDropdown = () => {
  const [isVisible, setVisibility] = React.useState(false);
  const toggler = React.useRef<HTMLAnchorElement | null>(null);

  const handleToggleMenu = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setVisibility(prev => !prev);
  };

  const closeDropdown = () => {
    setVisibility(false);
  };

  const containerRef = useClickOutside<HTMLDivElement>(closeDropdown, toggler.current);
  return (
    <DropdownContainer ref={containerRef}>
      <a onClick={handleToggleMenu} ref={toggler}>
        <NavbarIcon name="user" />
      </a>
      {isVisible && (
        <StyledDropdown>
          <Headline>You&apos;re currently not logged in</Headline>
          <ButtonRouter onClick={closeDropdown} to="/login">
            Login
          </ButtonRouter>
        </StyledDropdown>
      )}
    </DropdownContainer>
  );
};

export default LoginDropdown;
