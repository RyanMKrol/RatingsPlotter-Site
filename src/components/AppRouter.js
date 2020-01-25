import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import {
  Home,
} from "./../pages"

import './AppRouter.css';

export default function AppRouter() {
  return (
    <div id="root-container">
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
