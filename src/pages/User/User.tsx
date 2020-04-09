import React from "react";
import Container from "../../components/Container/Container";
import { useParams, Redirect } from "react-router-dom";
import UserFeed from "../../components/UserFeed/UserFeed";
import { observer } from "mobx-react";

const User: React.FC = observer(() => {
  const { id } = useParams();

  if (!id) {
    return <Redirect to="/" />;
  }

  return <Container>{<UserFeed userId={id} />}</Container>;
});

export default User;
