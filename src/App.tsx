import React from "react";
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
    <ThemeProvider theme={themes.primary}>
      <Header />
      <Navbar />
      <Container>
        <Breadcrumbs />
        <Sidebar />
        <Feed />
      </Container>
    </ThemeProvider>
  );
}

export default App;
