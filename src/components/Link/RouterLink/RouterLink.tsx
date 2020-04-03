import OwnLink, { ILinkProps } from "../Link";
import { Link, LinkProps } from "react-router-dom";
import React from "react";

type IRouterLinkProps = LinkProps<unknown> & ILinkProps;

const RouterLink: React.FC<IRouterLinkProps> = ({ ...props }) => <OwnLink as={Link} {...props} />;

export default RouterLink;
