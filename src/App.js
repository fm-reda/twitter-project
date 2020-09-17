import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home";
// import Header from "./components/Header";
import Header from "./components/Header";
import Live from "./pages/Live";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = props => {
  return (
    <>
      <Router>
        {/*Navbar */}
        <Route path="/" render={props => <Header {...props} />} />
        <div className="container mt-5 ">
          <Switch>
            {/* Home */}
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  exact
                  {...props}
                  // loggedInStatus={loggedInStatus}
                  // handleLogout={handleLogout}
                />
              )}
            />
            {/* Live */}

            <Route
              exact
              path="/live"
              render={props => (
                <Live
                  exact
                  {...props}
                  // loggedInStatus={loggedInStatus}
                  // handleLogout={handleLogout}
                />
              )}
            />
            <Route
              exact
              path="/signin"
              render={props => (
                <Login
                  exact
                  {...props}
                  // loggedInStatus={loggedInStatus}
                  // handleLogout={handleLogout}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Register
                  exact
                  {...props}
                  // loggedInStatus={loggedInStatus}
                  // handleLogout={handleLogout}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};
export default App;
