import { rem } from "polished";
import React from "react";
import styled from "styled-components";
import Icon, { IconTypes } from "../Icon/Icon";

const Item = styled.input`
  background: none;
  border: none;
  padding: 0 ${rem(10)};
  width: 80%;
  font-size: ${rem(17)};

  &:focus {
    outline: none;
  }
`;

const StyledSearchbar = styled.div<IInputContainerProps>`
  display: flex;
  align-items: center;
  width: ${props => (props.containerWidth ? props.containerWidth : rem(300))};
  background-color: ${props => props.theme.gray};
  padding: ${props => (props.containerPadding ? props.containerPadding : rem(8))};
  border-radius: ${props => (props.containerBorderRadius ? props.containerBorderRadius : rem(25))};
`;

interface IInputContainerProps {
  containerWidth?: number;
  containerPadding?: number;
  containerBorderRadius?: number;
}

interface IProps extends IInputContainerProps {
  icon?: IconTypes;
  iconSize?: number;
  label?: string;
  placeholder: string;
}

const Input: React.FC<IProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  icon,
  iconSize = 35,
  label,
  placeholder,
  containerWidth,
  containerPadding,
  containerBorderRadius,
  ...props
}) => {
  return (
    <StyledSearchbar
      containerBorderRadius={containerBorderRadius}
      containerPadding={containerPadding}
      containerWidth={containerWidth}
    >
      {icon && iconSize && <Icon name={icon} size={iconSize} />}
      <Item type="text" placeholder={placeholder} {...props} />
    </StyledSearchbar>
  );
};

export default Input;
