import React from "react";
import { ThemeProvider } from "styled-components";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import themes from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={themes.primary}>
      <Header />
      <Navbar />
      <Container></Container>
    </ThemeProvider>
  );
}

export default App;
