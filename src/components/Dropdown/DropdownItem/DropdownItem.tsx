import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import Icon, { IconTypes } from "../../Icon/Icon";
import Typography from "../../Typography/Typography";

const StyledDropdownItem = styled.a`
  display: flex;
  align-items: center;
  min-width: ${rem(170)};
  min-height: ${rem(48)};
  width: inherit;
  box-sizing: border-box;
  padding: 10px 20px;

  color: ${props => props.theme.black};

  font-size: ${rem(16)};

  text-decoration: none;
  user-select: none;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const StyledListItem = styled.li`
  position: relative;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.darkBorder};
`;

const StyledIcon = styled(Icon)`
  margin-right: 10px;
`;

const ActionButton = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  user-select: none;

  display: inline-block;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const TextNode = styled(Typography)`
  font-size: inherit;
  white-space: nowrap;
`;

export interface IDropdownItemProps extends React.ComponentPropsWithoutRef<"a"> {
  iconName?: IconTypes;
  iconSize?: number;
  actionComponent?: React.ReactNode;
  onActionClick?: () => void;
}

const onClickHandler = (onClick?: Function) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  event.preventDefault();
  if (onClick) onClick();
};

const DropdownItem: React.FC<IDropdownItemProps> = ({
  children,
  iconName,
  iconSize,
  onClick,
  actionComponent,
  onActionClick,
  ...props
}) => (
  <StyledListItem>
    <StyledDropdownItem onClick={onClickHandler(onClick)} {...props}>
      {iconName && <StyledIcon name={iconName} size={iconSize} />}
      {typeof children === "string" ? <TextNode>{children}</TextNode> : children}
    </StyledDropdownItem>
    {actionComponent && <ActionButton onClick={onActionClick}>{actionComponent}</ActionButton>}
  </StyledListItem>
);

export default DropdownItem;
