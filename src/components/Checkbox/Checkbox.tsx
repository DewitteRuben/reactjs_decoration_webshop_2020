import React from "react";
import Icon from "../Icon/Icon";
import styled from "styled-components";
import { rem } from "polished";
import _ from "lodash";

interface IProps {
  onToggle?: (checked: boolean) => void;
  size?: number;
}

type ICheckboxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  IProps;

const CheckboxIcon = styled(Icon)``;

interface ICheckboxInputProps {
  size: number;
}

const CheckboxInput = styled.input<ICheckboxInputProps>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: ${props => rem(props.size)};
  height: ${props => rem(props.size)};
  z-index: 10;
  cursor: inherit;
  
  &: active + ${CheckboxIcon} {
    opacity: 0.4;
  }
`;

interface ICheckboxContainerProps {
  size: number;
  hasLabel: boolean;
}

const CheckboxContainer = styled.div<ICheckboxContainerProps>`
  position: relative;
  display: inline-block;
  width: ${props => rem(props.size)};
  height: ${props => rem(props.size)};
  ${props => props.hasLabel && "margin-right: 5px;"}
`;

const ComponentContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: inherit;
  user-select: none;
  font-weight: 600;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Checkbox: React.FC<ICheckboxProps> = ({ checked, onToggle, className, size = 24, onChange, children }) => {
  const [isChecked, setCheckedState] = React.useState(checked);
  const [id] = React.useState(() => _.uniqueId("checkbox-"));
  console.log(isChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggle) {
      onToggle(event.target.checked);
    }
    setCheckedState(event.target.checked);
  };

  return (
    <ComponentContainer className={className}>
      <CheckboxContainer hasLabel={Boolean(children)} size={size}>
        <CheckboxInput id={id} size={size} onChange={handleChange} type="checkbox" />
        <CheckboxIcon size={size} name={isChecked ? "checkbox-checked" : "checkbox-blank"} />
      </CheckboxContainer>
      {children && <CheckboxLabel htmlFor={id}>{children}</CheckboxLabel>}
    </ComponentContainer>
  );
};

export default Checkbox;
