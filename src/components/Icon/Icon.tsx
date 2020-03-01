import React from "react";
import styled from "styled-components";

interface IProps {
  name: string;
  size?: number;
}

const Icon: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = ({ name, size = 28, className }) => {
  const StyledIcon = styled.img`
    width: ${size}px;
    height: ${size}px;
  `;

  return <StyledIcon className={className} src={require(`icons/${name}.svg`)} />;
};

export default Icon;
