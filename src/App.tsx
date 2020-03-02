import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import ItemCard from "./components/ItemCard/ItemCard";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import themes from "./styles/theme";

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 260px);
  grid-row-gap: 30px;
  grid-column-gap: 10px;
  justify-items: center;
  grid-area: list;
`;

function App() {
  return (
    <ThemeProvider theme={themes.primary}>
      <Header />
      <Navbar />
      <Container>
        <Breadcrumbs />
        <Sidebar />
        <ItemContainer>
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
          <ItemCard currency="€" description="This is a vase" price={23.0} state="Used" title="Vase 1" />
        </ItemContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
