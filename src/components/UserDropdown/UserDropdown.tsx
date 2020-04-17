import React from "react";
import styled from "styled-components";
import NavbarIcon from "../NavbarIcon/NavbarIcon";
import useClickOutside from "../../hooks/use-clickoutside";
import { useStores } from "../../hooks/use-stores";
import RouterLink from "../Link/RouterLink/RouterLink";
import { observer } from "mobx-react";
import DropdownItem from "../Dropdown/DropdownItem/DropdownItem";
import Dropdown, { closeDropdownCurry } from "../Dropdown/Dropdown";
import ButtonUnstyled from "../ButtonUnstyled/ButtonUnstyled";
import { useHistory } from "react-router-dom";

const DropdownContainer = styled.div`
  position: relative;
`;

const StyledRouterLink = styled(RouterLink)`
  line-height: 38px;
  margin-right: 5px;
`;

const LoginDropdown = observer(() => {
  const { firebaseStore } = useStores();
  const history = useHistory();

  const [isVisible, setVisibility] = React.useState(false);

  const toggler = React.useRef<HTMLButtonElement | null>(null);
  const closeDropdownCallback = closeDropdownCurry(setVisibility);
  const closeDropdown = closeDropdownCallback();

  const handleToggleMenu = () => {
    setVisibility(prev => !prev);
  };

  const handleLogout = closeDropdownCallback(() => firebaseStore.logout());
  const handleProfileSettings = closeDropdownCallback(() => history.push("/profile"));
  const handleMyProfile = (userId: string) => closeDropdownCallback(() => history.push(`/user/${userId}`));

  const containerRef = useClickOutside<HTMLUListElement>(closeDropdown, toggler.current);
  return (
    <DropdownContainer>
      {firebaseStore.isLoggedIn ? (
        <ButtonUnstyled onClick={handleToggleMenu} ref={toggler}>
          <NavbarIcon name="user" />
        </ButtonUnstyled>
      ) : (
        <StyledRouterLink to="/login">Login or Sign up</StyledRouterLink>
      )}
      {firebaseStore.isLoggedIn && (
        <Dropdown hideLastSeperator display={isVisible} ref={containerRef}>
          <DropdownItem onClick={handleMyProfile(firebaseStore.getUserId())} iconName="user">
            My profile
          </DropdownItem>
          <DropdownItem onClick={handleProfileSettings} iconName="cog">
            Settings
          </DropdownItem>
          <DropdownItem onClick={handleLogout} iconName="exit">
            Logout
          </DropdownItem>
        </Dropdown>
      )}
    </DropdownContainer>
  );
});

export default LoginDropdown;
