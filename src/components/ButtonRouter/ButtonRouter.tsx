import Button from "../Button/Button";
import styled from "styled-components";
import { Link, LinkProps } from "react-router-dom";
import React from "react";

type IButtonRouterProps = LinkProps<unknown>;

const ButtonRouter = styled(({ ...props }: IButtonRouterProps) => <Button as={Link} {...props} />)`
  text-decoration: none;
`;

export default ButtonRouter;
