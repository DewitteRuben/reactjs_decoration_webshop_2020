import React from "react";
import styled from "styled-components";
import Container from "../../components/Container/Container";
import { useStores } from "../../hooks/use-stores";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import DropdownItem from "../../components/Dropdown/DropdownItem/DropdownItem";
import { getFontSize } from "../../components/Typography/Typography";
import ProfileUserDataForm from "../../components/ProfileUserDataForm/ProfileUserDataForm";
import { BackgroundContainer } from "../../components/FormBuilderComponents";
import FullPageSpinner from "../../components/FullPageSpinner/FullPageSpinner";

const ProfileContainer = styled(Container)`
  display: flex;
  margin: 0 auto;
  width: 1140px;
`;

const ProfileNavigation = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 250px;

  li {
    border: none;
  }
`;

const ProfileNavigationItem = styled(DropdownItem)`
  padding: 0;
  font-size: ${getFontSize("x2")};
`;

const Profile = observer(() => {
  const { firebaseStore } = useStores();
  const user = firebaseStore.currentUser;

  // TODO: proper loading handling
  if (!firebaseStore.authStatus.loaded) {
    return <FullPageSpinner />;
  }

  if (firebaseStore.authStatus.error) {
    return <p>{firebaseStore.authStatus.error.message}</p>;
  }

  if (!firebaseStore.isLoggedIn || !user) {
    return <Redirect to="/" />;
  }

  return (
    <BackgroundContainer>
      <ProfileContainer>
        <ProfileNavigation>
          <ProfileNavigationItem iconSize={32} iconName="user">
            User information
          </ProfileNavigationItem>
        </ProfileNavigation>
        <ProfileUserDataForm user={user} />
      </ProfileContainer>
    </BackgroundContainer>
  );
});

export default Profile;
