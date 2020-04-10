import React from "react";
import Container from "../../components/Container/Container";
import { useParams, Redirect } from "react-router-dom";
import UserFeed from "../../components/UserFeed/UserFeed";
import { observer } from "mobx-react";
import styled from "styled-components";
import { SpacerVertical } from "../../components/Layout";
import UserInfoSidebar from "../../components/UserInfoSidebar/UserInfoSidebar";

const UserContainer = styled(Container)`
  width: 1140px;
`;

const User: React.FC = observer(() => {
  const { id } = useParams();

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <UserContainer>
      <UserInfoSidebar userId={id} />
      <SpacerVertical />
      <UserFeed userId={id} />
    </UserContainer>
  );
});

export default User;
