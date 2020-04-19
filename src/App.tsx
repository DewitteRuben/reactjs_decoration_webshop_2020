import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import themes from "./styles/theme";
import Detail from "./pages/Detail/Detail";
import Container from "./components/Container/Container";
import { onlyFocusOnTab } from "./utils/accessibility";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import NewItem from "./pages/NewItem/NewItem";
import User from "./pages/User/User";
import Checkout from "./pages/Checkout/Checkout";
import { ToastProvider } from "react-toast-notifications";

onlyFocusOnTab();

function App() {
  return (
    <Router>
      <ThemeProvider theme={themes.primary}>
        <ToastProvider placement="top-center" autoDismiss>
          <Header />
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/decoration" />
            </Route>

            <Route exact path="/new">
              <NewItem />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/user/:id">
              <User />
            </Route>

            <Route exact path="/checkout">
              <Checkout />
            </Route>

            {/* Detail Route */}
            <Route path="/:category/:subCategory/:itemCategory/:specificCategory/detail/:id">
              <Container>
                <Detail />
              </Container>
            </Route>

            {/* Feed Route */}
            <Route path="/:category/:subCategory?/:itemCategory?/:specificCategory?">
              <Main />
            </Route>

            <Route path="*">
              <Redirect to="/decoration" />
            </Route>
          </Switch>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
