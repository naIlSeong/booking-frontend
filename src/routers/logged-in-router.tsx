import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { CreateInUse } from "../pages/create-in-use";
import { Home } from "../pages/home";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route key={1} path="/" exact>
          <Home />
        </Route>
        <Route key={2} path="/create-in-use" exact>
          <CreateInUse />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
