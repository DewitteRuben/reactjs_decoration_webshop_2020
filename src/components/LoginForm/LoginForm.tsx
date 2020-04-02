import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import TextInput from "../Input/Input";
import Button from "../Button/Button";
import { serializeFormData } from "../../utils/forms";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";

export const Title = styled.span`
  font-size: ${rem(34)};
  font-weight: 600;
`;

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
    const formData = new FormData(event.currentTarget);
    const serialized = serializeFormData<ILoginForm>(formData);
    const { emailAddress, password } = serialized;
    if (emailAddress && password) {
      await firebaseStore.login(emailAddress, password);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Title>Login</Title>
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
