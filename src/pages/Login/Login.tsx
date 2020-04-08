import React from "react";
import { useStores } from "../../hooks/use-stores";
import LoginForm from "../../components/LoginForm/LoginForm";
import Container from "../../components/Container/Container";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";

const LoginPageContainer = styled(Container)`
  display: flex;
  margin-top: 25px;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Login = observer(() => {
  const { firebaseStore } = useStores();

  if (firebaseStore.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <LoginPageContainer>
      <LoginForm />
      <RegistrationForm />
    </LoginPageContainer>
  );
});

export default Login;
