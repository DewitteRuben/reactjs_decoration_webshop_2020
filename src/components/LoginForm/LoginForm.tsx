import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import TextInput from "../Input/Input";
import Button from "../Button/Button";

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

const LoginForm: React.FC = () => {
  return (
    <div>
      <Title>Login</Title>
      <VerticalRuleContainer>
        <VerticalRule />
        <InputContainer>
          <StyledInput label="Email address" />
          <StyledInput label="Password" type="password" />
        </InputContainer>
      </VerticalRuleContainer>
      <Button>Login now</Button>
    </div>
  );
};

export default LoginForm;
