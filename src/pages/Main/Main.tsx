import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import CategoryBreadcrumbs from "../../components/CategoryBreadcrumbs/CategoryBreadcrumbs";
import SortBySelect from "../../components/SortBySelect/SortBySelect";
import GridContainer from "../../components/GridContainer/GridContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";

const Titlebar = styled.div`
  height: ${rem(140)};
  grid-area: breadcrumbs;
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  grid-template-columns: 290px 1070px 1fr;
`;

const MiddleTitlebar = styled.div`
  grid-column-start: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Main: React.FC = () => {
  return (
    <>
      <Titlebar>
        <MiddleTitlebar>
          <CategoryBreadcrumbs />
          <SortBySelect />
        </MiddleTitlebar>
      </Titlebar>
      <GridContainer>
        <Sidebar />
        <Feed />
      </GridContainer>
    </>
  );
};

export default Main;
