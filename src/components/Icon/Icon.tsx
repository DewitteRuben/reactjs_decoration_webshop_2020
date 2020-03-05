import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  size?: number;
}

interface IStyledIconProps {
  size: number;
}

const StyledIcon = styled.img<IStyledIconProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const Icon: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ name, size = 28, ...props }) => {
  return <StyledIcon src={require(`icons/${name}.svg`)} size={size} {...props} />;
};

export default Icon;
