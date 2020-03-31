import React from "react";
import styled from "styled-components";
import TextInput from "../Input/Input";
import Button from "../Button/Button";
import { Title } from "../LoginForm/LoginForm";
import Checkbox from "../Checkbox/Checkbox";

const StyledInput = styled(TextInput)``;

const StyledCheckbox = styled(Checkbox)``;

const InputContainer = styled.div`
  margin-bottom: 16px;
  ${StyledInput}, ${StyledCheckbox} {
    margin-top: 23px;
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
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const validateEmail = (value: string) => {
    const isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    return !isValidEmail.test(value);
  };

  const onChangeTextHandler = (text: string) => {
    console.log(text);
  };

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <form ref={formRef} onSubmit={handleOnSubmit}>
      <Title>No account? Register now</Title>
      <InputContainer>
        <VerticalRuleContainer>
          <VerticalRule />
          <Row>
            <StyledInput name="username" label="Username" />
          </Row>
          <Row>
            <StyledInput
              onChangeText={onChangeTextHandler}
              type="text" // type text to avoid email trimming bug in CTRL+backspace https://github.com/facebook/react/issues/11881
              validate={validateEmail}
              errorMessage="Invalid email address."
              name="emailAddress"
              required
              label="Email Address"
            />
            <StyledInput required name="confirmEmailAddress" label="Confirm Email Address" />
          </Row>
          <Row>
            <StyledInput name="password" label="Password" type="password" />
            <StyledInput label="Confirm Password" type="password" />
          </Row>
        </VerticalRuleContainer>
        <Row>
          <StyledCheckbox name="terms">
            I have read, understood and agreed to the <u>Terms of Use</u> and the <u>Privacy Policy</u>.
          </StyledCheckbox>
        </Row>
      </InputContainer>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegistrationForm;
