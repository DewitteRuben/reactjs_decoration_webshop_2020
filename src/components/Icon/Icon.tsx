import React, { FunctionComponent, SVGProps } from "react";
import styled from "styled-components";
import { ReactComponent as HeartIcon } from "../../icons/heart.svg";
import { ReactComponent as CartIcon } from "../../icons/cart.svg";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import { ReactComponent as UserIcon } from "../../icons/user.svg";
import { ReactComponent as ArrowDownIcon } from "../../icons/arrow-down.svg";
import { ReactComponent as HeartFillIcon } from "../../icons/heart-fill.svg";
import { ReactComponent as AddShoppingCartIcon } from "../../icons/add-shopping-cart.svg";
import { ReactComponent as ClockIcon } from "../../icons/clock.svg";
import { ReactComponent as ConditionLabelIcon } from "../../icons/condition-label.svg";
import { ReactComponent as NextIcon } from "../../icons/next.svg";
import { ReactComponent as BackIcon } from "../../icons/back.svg";
import { ReactComponent as CheckboxCheckedIcon } from "../../icons/checkbox-checked.svg";
import { ReactComponent as CheckboxBlankIcon } from "../../icons/checkbox-blank.svg";
import { ReactComponent as ExitIcon } from "../../icons/exit.svg";
import { ReactComponent as ArrowBackIcon } from "../../icons/arrow-back.svg";
import { ReactComponent as AddUserIcon } from "../../icons/add-user.svg";
import { ReactComponent as MessageIcon } from "../../icons/message.svg";
import { ReactComponent as UserProfileIcon } from "../../icons/user-profile.svg";
import { ReactComponent as WrenchIcon } from "../../icons/wrench.svg";
import { ReactComponent as CogIcon } from "../../icons/cog.svg";

export type IconTypes =
  | "heart"
  | "heart-fill"
  | "arrow-down"
  | "cart"
  | "search"
  | "user"
  | "add-shopping-cart"
  | "clock"
  | "condition-label"
  | "next"
  | "back"
  | "checkbox-checked"
  | "checkbox-blank"
  | "exit"
  | "arrow-back"
  | "add-user"
  | "message"
  | "user-profile"
  | "wrench"
  | "cog";

const iconMap: Record<IconTypes, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  heart: HeartIcon,
  "arrow-down": ArrowDownIcon,
  cart: CartIcon,
  search: SearchIcon,
  user: UserIcon,
  "heart-fill": HeartFillIcon,
  "add-shopping-cart": AddShoppingCartIcon,
  clock: ClockIcon,
  "condition-label": ConditionLabelIcon,
  back: BackIcon,
  next: NextIcon,
  "checkbox-checked": CheckboxCheckedIcon,
  "checkbox-blank": CheckboxBlankIcon,
  exit: ExitIcon,
  "arrow-back": ArrowBackIcon,
  "add-user": AddUserIcon,
  message: MessageIcon,
  "user-profile": UserProfileIcon,
  wrench: WrenchIcon,
  cog: CogIcon
};

interface IProps {
  name: IconTypes;
}

interface IStyledIconProps {
  size?: number;
}

type CombinedProps = IProps & Omit<React.SVGProps<SVGSVGElement>, "ref">;

const ForwardedIcon = React.forwardRef(({ name, ...props }: CombinedProps, ref: React.Ref<SVGSVGElement>) => {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} ref={ref} />;
});

ForwardedIcon.displayName = "Icon";

const Icon = styled(ForwardedIcon)<IStyledIconProps>`
  width: ${props => props.size || 28}px;
  height: ${props => props.size || 28}px;
`;

export default Icon;
