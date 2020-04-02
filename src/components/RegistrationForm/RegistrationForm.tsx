import React from "react";
import styled from "styled-components";
import TextInput from "../Input/Input";
import Button from "../Button/Button";
import { Title } from "../LoginForm/LoginForm";
import Checkbox from "../Checkbox/Checkbox";
import { validateEmail, validateEqualValue, validatePassword, isValidEmail } from "../../utils/inputValidation";
import { useStores } from "../../hooks/use-stores";
import _ from "lodash";
import { serializeFormData } from "../../utils/forms";

const StyledInput = styled(TextInput)``;

const StyledCheckbox = styled(Checkbox)``;

const InputContainer = styled.div`
  margin-bottom: 16px;
  ${StyledInput} {
    margin-top: 15px;
  }

  ${StyledCheckbox} {
    margin-top: 5px;
  }
`;

const VerticalRule = styled.div`
  display: inline-block;
  border-left: 1px solid ${props => props.theme.darkGray};
  height: 140px;
  position: absolute;
  top: 27px;
  left: -23px;
`;

const VerticalRuleContainer = styled.div`
  position: relative;
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
    const formData = new FormData(event.currentTarget);
    const serialized = serializeFormData<IRegistrationForm>(formData);
    const { username, password, emailAddress } = serialized;
    if (username && password && emailAddress) {
      await firebaseStore.createUser(username, emailAddress, password);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Title>No account? Register now</Title>
      <InputContainer>
        <VerticalRuleContainer>
          <VerticalRule />
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
        </VerticalRuleContainer>
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
