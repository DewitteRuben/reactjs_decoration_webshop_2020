import styled from "styled-components";
import Typography, { ITypographyProps } from "../Typography/Typography";
import React from "react";

const StyledTypography = styled(Typography)`
  background: none;
  border: none;
  cursor: pointer;
`;

type ButtonUnstyledProps = ITypographyProps & React.ComponentPropsWithRef<"button">;

const ButtonUnstyled: React.FC<ButtonUnstyledProps> = React.forwardRef(({ ...props }, ref: React.Ref<HTMLButtonElement>) => {
  return <StyledTypography as="button" fontSize="normal" ref={ref} {...props} />;
});

ButtonUnstyled.displayName = "ButtonUnstyled";

export default ButtonUnstyled;
