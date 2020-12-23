import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
