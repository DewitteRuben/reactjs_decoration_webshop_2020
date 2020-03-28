import { rem } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IParams } from "../../api/api";

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

const Anchor = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.darkGray};
  font-size: ${rem(14)};

  &: hover {
    border-bottom: 1px solid ${props => props.theme.darkGray};
  }
`;

const Title = styled.h2`
  margin: 0;
  font-weight: normal;
  font-size: ${rem(34)};
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
        <Anchor
          to={`/${breadcrumbs
            .slice(0, index + 1)
            .map(e => e.key)
            .join("/")}`}
        >
          {value}
        </Anchor>
      </li>
    );
  });
};

const Breadcrumbs: React.FC<IBreadcrumbProps> = ({ items, currentItem, hideCurrent = false }) => {
  return (
    <BreadcrumbsContainer>
      <BreadCrumbsUL>{items.length > 1 ? renderCrumbsList(items) : null}</BreadCrumbsUL>
      {!hideCurrent && <Title>{currentItem}</Title>}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;
