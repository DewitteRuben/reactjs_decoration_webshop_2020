import React from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Title } from "../LoginForm/LoginForm";
import Checkbox from "../Checkbox/Checkbox";

const StyledInput = styled(Input)``;

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
  return (
    <form>
      <Title>No account? Register now</Title>
      <InputContainer>
        <VerticalRuleContainer>
          <VerticalRule />
          <Row>
            <StyledInput name="username" label="Username" />
          </Row>
          <Row>
            <StyledInput name="emailAddress" label="Email Address" />
            <StyledInput label="Confirm Email Address" />
          </Row>
          <Row>
            <StyledInput name="password" label="Password" type="password" />
            <StyledInput label="Confirm Password" type="password" />
          </Row>
        </VerticalRuleContainer>
        <Row>
          <StyledCheckbox>
            I have read, understood and agreed to the <u>Terms of Use</u> and the <u>Privacy Policy</u>.
          </StyledCheckbox>
        </Row>
      </InputContainer>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegistrationForm;
