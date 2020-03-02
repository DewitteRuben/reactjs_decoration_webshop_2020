import { rem } from "polished";
import React from "react";
import styled from "styled-components";

const BreadcrumbsContainer = styled.div`
  height: ${rem(80)};
  grid-area: breadcrumbs;
`;

const Breadcrumbs: React.FC = () => {
  return <BreadcrumbsContainer></BreadcrumbsContainer>;
};

export default Breadcrumbs;
