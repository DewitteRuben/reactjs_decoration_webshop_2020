import React from "react";
import styled from "styled-components";
import TextInput from "../Input/Input";
import Button from "../Button/Button";
import { serializeFormData } from "../../utils/forms";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
import Typography from "../Typography/Typography";

const StyledInput = styled(TextInput)``;

const VerticalRule = styled.div`
  display: inline-block;
  border-left: 1px solid ${props => props.theme.darkGray};
  height: 80px;
  position: absolute;
  top: 4px;
  left: -23px;
`;

const VerticalRuleContainer = styled.div`
  position: relative;
`;

const InputContainer = styled.div`
  margin-bottom: 23px;

  ${StyledInput} {
    margin-top: 23px;
  }
`;

interface ILoginForm {
  emailAddress: string;
  password: string;
}

const LoginForm: React.FC = observer(() => {
  const { firebaseStore } = useStores();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serialized = serializeFormData<ILoginForm>(event.currentTarget);
    const { emailAddress, password } = serialized;
    if (emailAddress && password) {
      await firebaseStore.login(emailAddress, password);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Typography fontSize="largest" as="h2" fontWeight="bold">
        Login
      </Typography>
      <VerticalRuleContainer>
        <VerticalRule />
        <InputContainer>
          <StyledInput name="emailAddress" label="Email address" />
          <StyledInput name="password" label="Password" type="password" />
        </InputContainer>
      </VerticalRuleContainer>
      <Button>Login now</Button>
    </form>
  );
});

export default LoginForm;
