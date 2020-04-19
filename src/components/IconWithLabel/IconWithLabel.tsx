import React from "react";
import Icon, { IconProps } from "../Icon/Icon";
import styled from "styled-components";

type IIconWithLabelProps = IconProps;

const IconWithLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconWithLabel: React.FC<IIconWithLabelProps> = ({ children, ...other }) => {
  return (
    <IconWithLabelContainer>
      <Icon {...other} />
      <span>{children}</span>
    </IconWithLabelContainer>
  );
};

export default IconWithLabel;
