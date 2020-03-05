import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Container from "./components/Container/Container";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import themes from "./styles/theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={themes.primary}>
        <Header />
        <Navbar />
        <Breadcrumbs />
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
