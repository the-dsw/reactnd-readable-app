import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Posts from "./Posts"
import Category from "./Category"
import DetailsPost from "./DetailsPost"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/:category" component={Category} />
          <Route exact path="/:category/:post_id" component={DetailsPost} />
        </Switch>
      </Router>
    )
  }
}

export default App
