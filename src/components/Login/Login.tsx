import React from "react";
import { useStores } from "../../hooks/use-stores";
import LoginForm from "../LoginForm/LoginForm";
import Container from "../Container/Container";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import styled from "styled-components";

const LoginPageContainer = styled(Container)`
  display: flex;
  margin-top: 25px;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Login = () => {
  const { firebaseStore } = useStores();
  // @ts-ignore
  window.firebaseStore = firebaseStore;

  return (
    <LoginPageContainer>
      <LoginForm />
      <RegistrationForm />
    </LoginPageContainer>
  );
};

export default Login;
