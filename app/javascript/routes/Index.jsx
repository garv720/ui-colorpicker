import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Colors from "../components/Colors";
import NewColor from "../components/NewColor";

export default (
  //Home routes.....
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/colors" exact component={Colors} />
      <Route path="/color" exact component={NewColor} />
    </Switch>
  </Router>
);