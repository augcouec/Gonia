import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <main className="container">
        <Switch>
          <Route exact path={process.env.PUBLIC_URL}>
            <Homepage />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/signin`}>
            <SignIn />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/dashboard`}>
            <Dashboard />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
