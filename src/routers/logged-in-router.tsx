import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { CreateInUse } from "../pages/create-in-use";
import { CreateBooking } from "../pages/create-booking";
import { Home } from "../pages/home";
import { MyProfile } from "../pages/my-profile";

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
        <Route key={3} path="/create-booking" exact>
          <CreateBooking />
        </Route>
        <Route key={4} path="/my-profile" exact>
          <MyProfile />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
