import React from "react";
import Button from "../Button/Button";
import Icon, { IconTypes } from "../Icon/Icon";
import styled from "styled-components";

const StyledButtonWithIcon = styled(Button)`
  ${Icon} {
    margin-left: 8px;
  }
`;

type HTMLButtonPropsWithoutRef = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "ref"
>;

interface IButtonWithIcons extends HTMLButtonPropsWithoutRef {
  iconName: IconTypes;
}

const ButtonWithIcon: React.FC<IButtonWithIcons> = React.forwardRef(
  ({ iconName, children, ...rest }, ref: React.Ref<HTMLButtonElement>) => {
    return (
      <StyledButtonWithIcon {...rest} ref={ref}>
        {children} <Icon color="red" name={iconName} />
      </StyledButtonWithIcon>
    );
  }
);

ButtonWithIcon.displayName = "ButtonWithIcon";

export default ButtonWithIcon;
