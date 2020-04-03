import { rem } from "polished";
import React from "react";
import styled, { keyframes } from "styled-components";
import Icon, { IconTypes } from "../Icon/Icon";
import { getFontSize } from "../Typography/Typography";

interface IErrorMessageProps {
  error?: boolean;
}

const ErrorMessage = styled.span<IErrorMessageProps>`
  font-size: ${getFontSize("smallest")};
  color: ${props => props.theme.error};
  opacity: ${props => Number(props.error)};
  max-width: ${rem(305)};
  margin-top: 5px;
  transition: opacity 150ms ease-in;
`;

const Input = styled.input`
  background: none;
  border: none;
  padding: 0 ${rem(5)} 0 ${rem(20)};
  width: 80%;
  margin-top: ${rem(1)};
  font-size: ${getFontSize("normal")};
`;

interface ILabelProps {
  error?: boolean;
}

const Label = styled.label<ILabelProps>`
  position: absolute;
  left: ${rem(13)};
  font-size: ${getFontSize("normal")};
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  onValidate?: (value: string) => boolean | Promise<boolean>;
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
  onValidate,
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

    const handleAsyncValidate = async () => {
      if (currentVal.length && onValidate && errorMessage?.length) {
        const isInvalid = await onValidate(currentVal);
        if (isInvalid) {
          setIsInvalid(isInvalid);
          return inputRef.current?.setCustomValidity(errorMessage);
        }
      }
    };

    handleAsyncValidate();

    if (required && errorMessage) {
      setIsInvalid(currentVal.length === 0 && hasFocused);
      if (currentVal.length === 0) {
        return inputRef.current.setCustomValidity(errorMessage);
      }
    }

    setIsInvalid(false);
    return inputRef.current?.setCustomValidity("");
  }, [currentVal, errorMessage, required, onValidate, hasFocused]);

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
    <Container>
      <InputContainer className={className} error={isInvalid} animateLabel={Boolean(currentVal.length)}>
        <Input ref={inputRef} onChange={onChangeHandler} value={value || currentVal} {...props} />
        {label && <Label error={isInvalid}>{label}</Label>}
        {icon && iconSize && <InputIcon name={icon} size={iconSize} />}
      </InputContainer>
      <ErrorMessage error={isInvalid}>{errorMessage}</ErrorMessage>
    </Container>
  );
};

export default TextInput;
