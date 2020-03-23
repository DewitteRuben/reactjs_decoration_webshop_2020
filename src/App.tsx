import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import FeedLayoutContainer from "./components/Container/Container";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import themes from "./styles/theme";
import { rem } from "polished";
import SortBySelect from "./components/SortBySelect/SortBySelect";
import Detail from "./components/Detail/Detail";
import DetailContainer from "./components/DetailContainer/DetailContainer";

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

function App() {
  return (
    <Router>
      <ThemeProvider theme={themes.primary}>
        <Header />
        <Navbar />
        <Switch>
          {/* Detail Route */}
          <Route path="/:category/:subCategory/:itemCategory/:specificCategory/detail/:id">
            <DetailContainer>
              <Detail />
            </DetailContainer>
          </Route>

          {/* Feed Route */}
          <Route path="/:category/:subCategory?/:itemCategory?/:specificCategory?">
            <Titlebar>
              <MiddleTitlebar>
                <Breadcrumbs />
                <div>
                  <SortBySelect />
                </div>
              </MiddleTitlebar>
            </Titlebar>
            <FeedLayoutContainer>
              <Sidebar />
              <Feed />
            </FeedLayoutContainer>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
