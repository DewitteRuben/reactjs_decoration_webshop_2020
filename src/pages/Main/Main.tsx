import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import CategoryBreadcrumbs from "../../components/CategoryBreadcrumbs/CategoryBreadcrumbs";
import SortBySelect from "../../components/SortBySelect/SortBySelect";
import GridContainer from "../../components/GridContainer/GridContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

const Titlebar = styled.div`
  display: flex;
  height: ${rem(140)};
  grid-area: breadcrumbs;
  max-width: 1440px;
  align-items: center;
`;

const MiddleTitlebar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1070px;
  width: 100%;
`;

const Main: React.FC = () => {
  return (
    <GridContainer>
      <Titlebar>
        <MiddleTitlebar>
          <CategoryBreadcrumbs />
          <SortBySelect />
        </MiddleTitlebar>
      </Titlebar>
      <Sidebar />
      <Feed />
    </GridContainer>
  );
};

export default Main;
