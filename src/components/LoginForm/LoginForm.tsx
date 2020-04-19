import React from "react";
import styled from "styled-components";
import TextInput from "../Input/Input";
import Button from "../Button/Button";
import { serializeFormData } from "../../utils/forms";
import { useStores } from "../../hooks/use-stores";
import { observer } from "mobx-react";
import Typography from "../Typography/Typography";
import { useToasts } from "react-toast-notifications";
import { getLoginErrorMessage, Success } from "../../store/FirebaseStore";
import { validateEmail } from "../../utils/inputValidation";

const StyledInput = styled(TextInput)``;

const InputContainer = styled.div`
  margin-bottom: 23px;

  ${StyledInput} {
    margin-top: 16px;
  }
`;

interface ILoginForm {
  emailAddress: string;
  password: string;
}

const LoginForm: React.FC = observer(() => {
  const { firebaseStore } = useStores();
  const { addToast } = useToasts();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serialized = serializeFormData<ILoginForm>(event.currentTarget);
    const { emailAddress, password } = serialized;
    if (emailAddress && password) {
      try {
        await firebaseStore.login(emailAddress, password);
        addToast(Success.LOGIN_SUCCESS, { appearance: "success" });
      } catch (error) {
        const message = getLoginErrorMessage(error.code);
        addToast(message, { appearance: "error" });
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Typography fontSize="largest" as="h2" fontWeight="bold">
        Login
      </Typography>
      <InputContainer>
        <StyledInput
          required
          type="text"
          onValidate={validateEmail}
          errorMessage="Invalid email address."
          name="emailAddress"
          label="Email address"
        />
        <StyledInput required name="password" label="Password" type="password" />
      </InputContainer>
      <Button>Login now</Button>
    </form>
  );
});

export default LoginForm;
