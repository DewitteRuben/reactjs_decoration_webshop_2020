import React from "react";
import styled from "styled-components";
import TextInput from "../Input/Input";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { validateEmail, validateEqualValue, validatePassword, isValidEmail } from "../../utils/inputValidation";
import { useStores } from "../../hooks/use-stores";
import _ from "lodash";
import { serializeFormData } from "../../utils/forms";
import Typography from "../Typography/Typography";
import { useToasts } from "react-toast-notifications";
import { getSignupErrorMessage, Success } from "../../store/FirebaseStore";

const StyledInput = styled(TextInput)``;

const StyledCheckbox = styled(Checkbox)``;

const InputContainer = styled.div`
  margin-bottom: 16px;
  ${StyledInput} {
    margin-top: 16px;
  }

  ${StyledCheckbox} {
    margin-top: 5px;
  }
`;

const Row = styled.div`
  display: flex;
  ${StyledInput} {
    margin-right: 20px;
  }
`;

const RegistrationForm: React.FC = () => {
  const { firebaseStore } = useStores();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailInUse, setEmailInUse] = React.useState(false);
  const { addToast } = useToasts();

  React.useEffect(() => {
    if (isValidEmail(emailAddress)) {
      _.debounce(async () => {
        const doesUserExist = await firebaseStore.doesUserExist(emailAddress);
        setEmailInUse(doesUserExist);
      }, 100)();
    }
  }, [emailAddress, firebaseStore]);

  const handleOnValidateEmail = (value: string) => emailInUse || validateEmail(value);

  const onEmailAddressChange = (text: string) => {
    setEmailAddress(text);
  };

  const onPasswordChange = (text: string) => {
    setPassword(text);
  };

  interface IRegistrationForm {
    username: string;
    password: string;
    emailAddress: string;
    terms: boolean;
  }

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serialized = serializeFormData<IRegistrationForm>(event.currentTarget);
    const { username, password, emailAddress } = serialized;
    if (username && password && emailAddress) {
      try {
        await firebaseStore.createUser(username, emailAddress, password);
        addToast(Success.SIGNUP_SUCCESS, { appearance: "success" });
      } catch (error) {
        if (error.code) {
          addToast(getSignupErrorMessage(error.code), { appearance: "error" });
        } else {
          addToast(getSignupErrorMessage(error.message), { appearance: "error" });
        }
      }
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Typography fontSize="largest" as="h2" fontWeight="bold">
        No account? Register now
      </Typography>
      <InputContainer>
        <Row>
          <StyledInput required name="username" label="Username" />
        </Row>
        <Row>
          <StyledInput
            onChangeText={onEmailAddressChange}
            type="text" // type text to avoid email trimming bug in CTRL+backspace https://github.com/facebook/react/issues/11881
            onValidate={handleOnValidateEmail}
            errorMessage={emailInUse ? "This email address is already in use." : "Invalid email address."}
            name="emailAddress"
            required
            label="Email Address"
          />
          <StyledInput
            onValidate={validateEqualValue(emailAddress)}
            errorMessage="This email address must match the previous field."
            required
            label="Confirm Email Address"
          />
        </Row>
        <Row>
          <StyledInput
            required
            errorMessage="The password must be at least 8 characters long, have a special character and a number."
            onChangeText={onPasswordChange}
            name="password"
            onValidate={validatePassword}
            label="Password"
            minLength={8}
            maxLength={30}
            type="password"
          />
          <StyledInput
            required
            onValidate={validateEqualValue(password)}
            errorMessage="This password must match the previous field."
            label="Confirm Password"
            type="password"
          />
        </Row>
        <Row>
          <StyledCheckbox required name="terms">
            I have read, understood and agreed to the <u>Terms of Use</u> and the <u>Privacy Policy</u>.
          </StyledCheckbox>
        </Row>
      </InputContainer>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegistrationForm;
