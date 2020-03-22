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

type CombinedProps = IProps &
  Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref">;

const Icon = React.forwardRef<HTMLImageElement, CombinedProps>(({ name, size = 28, ...props }, ref) => (
  <StyledIcon
    src={require(`icons/${name}.svg`)}
    size={size}
    ref={ref as React.RefObject<HTMLImageElement> | null | undefined}
    {...props}
  />
));

Icon.displayName = "Icon";

export default Icon;
