import React from "react";
import styled from "styled-components";
import Link from "../../components/Link/Link";
import Container from "../../components/Container/Container";
import { useStores } from "../../hooks/use-stores";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import Avatar from "../../components/Avatar/Avatar";
import ProfileUserInfo from "../../components/ProfileUserInfo/ProfileUserInfo";
import ActionCard from "../../components/ActionCard/ActionCard";
import DropdownItem from "../../components/Dropdown/DropdownItem/DropdownItem";
import { getFontSize } from "../../components/Typography/Typography";

const ProfileNavigation = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 360px;

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
  const currentUser = firebaseStore.currentUser;

  // TODO: proper loading handling
  if (firebaseStore.authStatus.error) {
    return <p>{firebaseStore.authStatus.error.message}</p>;
  }

  if (!firebaseStore.authStatus.loaded) {
    return <p>Loading...</p>;
  }

  if (!firebaseStore.isLoggedIn || !currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <ProfileNavigation>
        <ProfileNavigationItem iconSize={32} iconName="user">
          User information
        </ProfileNavigationItem>
      </ProfileNavigation>
      <ActionCard title="Your profile" actionComponent={<Link>Edit</Link>}>
        <ProfileUserInfo user={currentUser} />
        <Avatar imgURL={currentUser.photoURL} username={currentUser.email} size="large" />
      </ActionCard>
    </Container>
  );
});

export default Profile;
