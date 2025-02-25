import styled from "styled-components";
import { rem } from "polished";
import React from "react";

type AvatarSizes = "small" | "normal" | "large" | "largest";

const sizeMap: Record<AvatarSizes, number> = {
  small: 32,
  normal: 64,
  large: 96,
  largest: 160
};

interface IStyledAvatarProps {
  size?: AvatarSizes;
  imgURL?: string | null;
}

const getAvatarFontSize = (size: AvatarSizes) => {
  const intSize = sizeMap[size];
  if (intSize - 32 < 32) {
    return intSize / 2;
  }
  if (intSize > 96) {
    return 96;
  }
  return intSize - 32;
};

export const getAvatarSize = (size: AvatarSizes) => {
  return rem(sizeMap[size]);
};

const computedSize = (size?: AvatarSizes) => {
  return size ? getAvatarSize(size) : getAvatarSize("normal");
};

const StyledAvatar = styled.span<IStyledAvatarProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: ${props => computedSize(props.size)};
  max-height: ${props => computedSize(props.size)};

  min-width: ${props => computedSize(props.size)};
  min-height: ${props => computedSize(props.size)};

  font-size: ${props => rem(props.size ? getAvatarFontSize(props.size) : getAvatarFontSize("normal"))};

  background-color: ${props => (props.imgURL ? props.theme.white : "#1a83c5")};
  background-image: ${props => (props.imgURL ? `url(${props.imgURL})` : "")};
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;

  color: ${props => props.theme.white};

  user-select: none;
`;

interface IAvatarProps {
  username?: string | null;
}

const Avatar: React.FC<IAvatarProps & IStyledAvatarProps> = ({ username, imgURL, ...props }) => {
  return (
    <StyledAvatar imgURL={imgURL} {...props}>
      {!imgURL && username?.length && username.charAt(0).toUpperCase()}
    </StyledAvatar>
  );
};

export default Avatar;
