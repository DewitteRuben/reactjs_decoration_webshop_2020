import React from "react";
import styled from "styled-components";
import { IParams } from "../../api/api";
import RouterLink from "../Link/RouterLink/RouterLink";
import Typography from "../Typography/Typography";

const BreadcrumbsContainer = styled.div``;

const BreadCrumbsUL = styled.ul`
  min-height: 18px;
  padding-inline-start: 0;
  & > li {
    padding: 0;
    display: inline-block;
    margin-right: 20px;
  }
`;

export interface IBreadcrumbProps {
  items: IParams[];
  currentItem: string;
  hideCurrent?: boolean;
}

const renderCrumbsList = (breadcrumbs: IParams[]) => {
  return breadcrumbs.map((item, index) => {
    const { key, value } = item;
    return (
      <li key={key}>
        <RouterLink
          color="darkGray"
          fontSize="small"
          to={`/${breadcrumbs
            .slice(0, index + 1)
            .map(e => e.key)
            .join("/")}`}
        >
          {value}
        </RouterLink>
      </li>
    );
  });
};

const Breadcrumbs: React.FC<IBreadcrumbProps> = ({ items, currentItem, hideCurrent = false }) => {
  return (
    <BreadcrumbsContainer>
      <BreadCrumbsUL>{items.length > 1 ? renderCrumbsList(items) : null}</BreadCrumbsUL>
      {!hideCurrent && (
        <Typography as="h2" fontSize="largest">
          {currentItem}
        </Typography>
      )}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;
