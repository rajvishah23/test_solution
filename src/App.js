import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Create from "./components/create_user_data";
import Edit from "./components/edit_user_data";
import View from "./components/view_user_data";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              React App
            </Link>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/create"} className="nav-link">
                    Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/view"} className="nav-link">
                    View
                  </Link>
                </li>
              </ul>
            </div>
          </nav>{" "}
          <br />
          <Switch>
            <Route exact path="/create" component={Create} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/view" component={View} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
