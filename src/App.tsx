import React from "react";
import { ThemeProvider } from "styled-components";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import themes from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={themes.primary}>
      <Header />
      <Container></Container>
    </ThemeProvider>
  );
}

export default App;
