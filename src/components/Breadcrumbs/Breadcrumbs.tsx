import { observer } from "mobx-react";
import { rem } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "../../hooks/use-stores";
import themes from "../../styles/theme";
import { parseStoreItemKey } from "../../utils/string";

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
    border-bottom: 1px solid ${props => themes.primary.darkGray};
  }
`;

const Title = styled.h2`
  margin: 0;
  font-weight: normal;
  font-size: ${rem(34)};
`;

const renderCrumbsList = (breadcrumbs: string[]) =>
  breadcrumbs.map((key, index) => (
    <li key={key}>
      <Anchor to={`/${breadcrumbs.slice(0, index + 1).join("/")}`}>{parseStoreItemKey(key)}</Anchor>
    </li>
  ));

const Breadcrumbs: React.FC = observer(() => {
  const { itemStore } = useStores();
  const currentItem = parseStoreItemKey(itemStore.breadcrumbs[itemStore.breadcrumbs.length - 1]);

  return (
    <BreadcrumbsContainer>
      <BreadCrumbsUL>{itemStore.breadcrumbs.length > 1 ? renderCrumbsList(itemStore.breadcrumbs) : null}</BreadCrumbsUL>
      <Title>{currentItem}</Title>
    </BreadcrumbsContainer>
  );
});

export default Breadcrumbs;
