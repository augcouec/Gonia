import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/AddProject";
import ProjectsList from "./pages/ProjectsList";
import Project from "./pages/Project";

const App = () => {
  return (
    <Router>
      <main>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/dashboard">
            <div className="base-layout">
              <Sidebar />
              <Dashboard />
            </div>
          </Route>
          <Route exact path="/projects">
            <div className="base-layout">
              <Sidebar />
              <ProjectsList />
            </div>
          </Route>
          <Route exact path="/projects/add">
            <div className="base-layout">
              <Sidebar />
              <AddProject />
            </div>
          </Route>
          <Route exact path="/projects/:id">
            <div className="base-layout">
              <Sidebar />
              <Project />
            </div>
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
