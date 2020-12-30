import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { CreateInUse } from "../pages/create-in-use";
import { CreateBooking } from "../pages/create-booking";
import { Home } from "../pages/home";
import { MyProfile } from "../pages/my-profile";
import { EditProfile } from "../pages/edit-profile";
import { BookingDetail } from "../pages/booking-detail";
import { EditBooking } from "../pages/edit-booking";
import { TeamDetail } from "../pages/team-detail";
import { EditTeam } from "../pages/edit-team";
import { CreateTeam } from "../pages/create-team";
import { PlaceDetail } from "../pages/place-detail";
import { Teams } from "../pages/teams";
import { SearchTeam } from "../pages/search-team";
import { Places } from "../pages/places";
import { SearchPlace } from "../pages/search-place";

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
        <Route key={5} path="/edit-profile" exact>
          <EditProfile />
        </Route>
        <Route key={6} path="/booking/:id" exact>
          <BookingDetail />
        </Route>
        <Route key={7} path="/edit-booking/:id" exact>
          <EditBooking />
        </Route>
        <Route key={8} path="/team/:id" exact>
          <TeamDetail />
        </Route>
        <Route key={9} path="/edit-team" exact>
          <EditTeam />
        </Route>
        <Route key={10} path="/create-team" exact>
          <CreateTeam />
        </Route>
        <Route key={11} path="/place/:id" exact>
          <PlaceDetail />
        </Route>
        <Route key={12} path="/teams" exact>
          <Teams />
        </Route>
        <Route key={13} path="/search-team" exact>
          <SearchTeam />
        </Route>
        <Route key={14} path="/places" exact>
          <Places />
        </Route>
        <Route key={15} path="/search-place" exact>
          <SearchPlace />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
