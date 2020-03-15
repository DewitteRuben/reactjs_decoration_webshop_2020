import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Container from "./components/Container/Container";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import themes from "./styles/theme";
import { rem } from "polished";
import Select from "./components/Select/Select";
import SortBySelect from "./components/SortBySelect/SortBySelect";

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
        <Titlebar>
          <MiddleTitlebar>
            <Breadcrumbs />
            <div>
              <SortBySelect />
            </div>
          </MiddleTitlebar>
        </Titlebar>
        <Container>
          <Sidebar />
          <Route path="/:category/:subCategory?/:itemCategory?/:specificCategory?">
            <Feed />
          </Route>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
