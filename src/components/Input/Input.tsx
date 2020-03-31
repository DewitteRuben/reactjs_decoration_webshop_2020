import { rem } from "polished";
import React from "react";
import styled, { keyframes } from "styled-components";
import Icon, { IconTypes } from "../Icon/Icon";

interface IErrorMessageProps {
  error?: boolean;
}

const ErrorMessage = styled.span<IErrorMessageProps>`
  position: absolute;
  bottom: -18px;
  left: 15px;
  font-size: 12px;
  color: ${props => props.theme.error};
  opacity: ${props => (props.error ? "1" : "0")};
`;

const Input = styled.input`
  background: none;
  border: none;
  padding: 0 ${rem(5)} 0 ${rem(20)};
  width: 80%;
  margin-top: ${rem(1)};
  font-size: ${rem(16)};
`;

interface ILabelProps {
  error?: boolean;
}

const Label = styled.label<ILabelProps>`
  position: absolute;
  left: ${rem(13)};
  font-size: ${rem(16)};
  background-color: ${props => props.theme.white};
  color: ${props => (props.error ? props.theme.error : props.theme.black)};
  transform-origin: top left;
  padding 0 ${rem(5)};
  pointer-events: none;

  transition: color 150ms ease-in;
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
  border: 1px solid ${props => (props.error ? props.theme.error : props.theme.darkGray)};
  transition: border 150ms ease-in;

  ${Input}:focus + label {
    animation: ${scaleAndTranslate} 150ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  ${Input} + label {
    animation: ${props => (props.animateLabel ? scaleAndTranslate : defaultLabelPosition)} 150ms cubic-bezier(0.4, 0, 0.2, 1)
      forwards;
  }
`;

interface IInputContainerProps {
  animateLabel?: boolean;
  error?: boolean;
}

interface IProps extends IInputContainerProps {
  icon?: IconTypes;
  iconSize?: number;
  label?: string;
  value?: string;
  validate?: (value: string) => boolean;
  errorMessage?: string;
  onChangeText?: (value: string) => void;
}

type HTMLInputPropsNoRef = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"
>;
type CombinedProps = IProps & HTMLInputPropsNoRef;

const TextInput: React.FC<Omit<CombinedProps, "onChange">> = ({
  icon,
  iconSize = 28,
  label,
  className,
  validate,
  errorMessage,
  onChangeText,
  required,
  value,
  ...props
}) => {
  const [currentVal, setCurrentVal] = React.useState("");
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [hasFocused, setHasFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (required && !errorMessage?.length) {
    errorMessage = "This field is required.";
  }

  React.useEffect(() => {
    if (!inputRef.current) return;

    inputRef.current.onfocus = () => {
      if (!hasFocused) setHasFocused(true);
    };

    if (currentVal.length && validate && errorMessage?.length) {
      const isInvalid = validate(currentVal);
      if (isInvalid) {
        setIsInvalid(isInvalid);
        return inputRef.current.setCustomValidity(errorMessage);
      }
    }

    if (required && errorMessage) {
      setIsInvalid(currentVal.length === 0 && hasFocused);
      if (currentVal.length === 0) {
        return inputRef.current.setCustomValidity(errorMessage);
      }
    }

    setIsInvalid(false);
    return inputRef.current?.setCustomValidity("");
  }, [currentVal, errorMessage, required, validate, hasFocused]);

  const onChangeHandler = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setCurrentVal(inputValue);
      if (onChangeText) {
        onChangeText(inputValue);
      }
    },
    [onChangeText]
  );

  return (
    <InputContainer className={className} error={isInvalid} animateLabel={Boolean(currentVal.length)}>
      <Input ref={inputRef} onChange={onChangeHandler} value={value || currentVal} {...props} />
      {label && <Label error={isInvalid}>{label}</Label>}
      {icon && iconSize && <InputIcon name={icon} size={iconSize} />}
      <ErrorMessage error={isInvalid}>{errorMessage}</ErrorMessage>
    </InputContainer>
  );
};

export default TextInput;
