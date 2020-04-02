import OwnLink from "../Link";
import { Link, LinkProps } from "react-router-dom";
import React from "react";

type IRouterLinkProps = LinkProps<unknown>;

const RouterLink: React.FC<IRouterLinkProps> = ({ ...props }) => <OwnLink as={Link} {...props} />;

export default RouterLink;
