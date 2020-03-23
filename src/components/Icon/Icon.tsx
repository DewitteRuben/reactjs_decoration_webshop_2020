import React, { FunctionComponent, SVGProps } from "react";
import styled from "styled-components";
import { ReactComponent as HeartIcon } from "../../icons/heart.svg";
import { ReactComponent as CartIcon } from "../../icons/cart.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import { ReactComponent as UserIcon } from "../../icons/user.svg";
import { ReactComponent as ArrowDownIcon } from "../../icons/arrow-down.svg";
import { ReactComponent as HeartFillIcon } from "../../icons/heart-fill.svg";

export type IconTypes = "heart" | "heart-fill" | "arrow-down" | "cart" | "search" | "user";

const iconMap: Record<IconTypes, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  heart: HeartIcon,
  "arrow-down": ArrowDownIcon,
  cart: CartIcon,
  search: SearchIcon,
  user: UserIcon,
  "heart-fill": HeartFillIcon
};

interface IProps {
  name: IconTypes;
}

interface IStyledIconProps {
  size?: number;
}

type CombinedProps = IProps & Omit<React.SVGProps<SVGSVGElement>, "ref">;

const Icon = React.forwardRef(({ name, ...props }: CombinedProps, ref: React.Ref<SVGSVGElement>) => {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} ref={ref} />;
});

Icon.displayName = "Icon";

const StyledIcon = styled(Icon)<IStyledIconProps>`
  width: ${props => props.size || 28}px;
  height: ${props => props.size || 28}px;
`;

export default StyledIcon;
