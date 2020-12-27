import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { Login } from "../pages/login";
import { Signup } from "../pages/singup";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/logout" exact>
          <Redirect to="/" />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
