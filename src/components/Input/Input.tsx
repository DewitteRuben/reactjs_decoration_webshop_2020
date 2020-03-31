import { rem } from "polished";
import React from "react";
import styled, { keyframes } from "styled-components";
import Icon, { IconTypes } from "../Icon/Icon";

const Item = styled.input`
  background: none;
  border: none;
  padding: 0 ${rem(5)} 0 ${rem(20)};
  width: 80%;
  margin-top: ${rem(1)};
  font-size: ${rem(16)};
`;

const Label = styled.label`
  position: absolute;
  left: ${rem(13)};
  font-size: ${rem(16)};
  background-color: ${props => props.theme.white};
  transform-origin: top left;
  padding 0 ${rem(5)};
  pointer-events: none;
`;

const scaleAndTranslate = keyframes`
  from {
    transform: scale(1) translateY(0);
  }
  to {
    transform: scale(0.75) translateY(-22px) translateX(8px);
  }
`;

const defaultLabelPosition = keyframes`
  from {
    transform: scale(0.75) translateY(-22px) translateX(8px);
  }
  to {
    transform: scale(1) translateY(0);
  }
`;

const InputIcon = styled(Icon)`
  cursor: pointer;
`;

const InputContainer = styled.div<IInputContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  width: ${rem(300)};
  background-color: ${props => props.theme.white};
  padding: ${rem(4)} ${rem(2)};
  border-radius: ${rem(25)};
  border: 1px solid ${props => props.theme.darkGray};

  ${Item}:focus + label {
    animation: ${scaleAndTranslate} 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  ${Item} + label {
    animation: ${props => (props.animateLabel ? scaleAndTranslate : defaultLabelPosition)} 150ms cubic-bezier(0.4, 0, 0.2, 1)
      forwards;
  }
`;

interface IInputContainerProps {
  animateLabel?: boolean;
}

interface IProps extends IInputContainerProps {
  icon?: IconTypes;
  iconSize?: number;
  label?: string;
}

const Input: React.FC<IProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  icon,
  iconSize = 28,
  label,
  className,
  ...props
}) => {
  const [value, setValue] = React.useState("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <InputContainer className={className} animateLabel={Boolean(value.length)}>
      <Item type="text" onChange={onChangeHandler} value={value} {...props} />
      {label && <Label>{label}</Label>}
      {icon && iconSize && <InputIcon name={icon} size={iconSize} />}
    </InputContainer>
  );
};

export default Input;
