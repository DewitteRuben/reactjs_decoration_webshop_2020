import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GridContainer from "./components/GridContainer/GridContainer";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import themes from "./styles/theme";
import { rem } from "polished";
import SortBySelect from "./components/SortBySelect/SortBySelect";
import Detail from "./components/Detail/Detail";
import Container from "./components/Container/Container";
import CategoryBreadcrumbs from "./components/CategoryBreadcrumbs/CategoryBreadcrumbs";
import { onlyFocusOnTab } from "./utils/accessibility";
import Login from "./components/Login/Login";

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

onlyFocusOnTab();

function App() {
  return (
    <Router>
      <ThemeProvider theme={themes.primary}>
        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/decoration" />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          {/* Detail Route */}
          <Route path="/:category/:subCategory/:itemCategory/:specificCategory/detail/:id">
            <Container>
              <Detail />
            </Container>
          </Route>

          {/* Feed Route */}
          <Route path="/:category/:subCategory?/:itemCategory?/:specificCategory?">
            <Titlebar>
              <MiddleTitlebar>
                <CategoryBreadcrumbs />
                <div>
                  <SortBySelect />
                </div>
              </MiddleTitlebar>
            </Titlebar>
            <GridContainer>
              <Sidebar />
              <Feed />
            </GridContainer>
          </Route>

          <Route path="*">
            <Redirect to="/decoration" />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
