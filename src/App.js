
import React from "react";
import { Home } from "./Screen";
import { Details } from "./Screen/Details";
import { IssueCount } from "./AppService";
import Loading from "../src/Component/LoadingComponent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class App extends React.Component {
  state = {};
  async componentDidMount() {
    this.setState({ loading: true });
    await IssueCount();
    this.setState({ loading: false });
  }
  render() {
    let { loading } = this.state;
    if (loading) {
      return <Loading loading={loading} />;
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/detail" component={Details} />
        </Switch>
      </Router>
    );
  }
}
