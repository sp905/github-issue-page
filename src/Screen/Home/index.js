/** @format */

import React from "react";
import AppHeader from "../../Component/AppHeader";
import { Table } from "../../Component/Table";
import { Details } from "../Details";
import "./home.css";
import { IssueCount, totalCountMethod } from "../../AppService";
export default class Home extends React.Component {
  state = { issueTabs: true };
  componentDidMount() {
    let {totalCount} = totalCountMethod();
    this.setState({ totalCount });
  }
  isIssueTab = () => {
    this.setState({ issueTabs: true });
  };
  detailMethod = (value) => {
    localStorage.setItem("data", JSON.stringify(value));
    this.props.history.push({
      pathname: "/detail",
      detailData: value,
    });
  };
  render() {
    return (
      <div style={{ flex: 1 }}>
        <AppHeader {...this.props} isIssueTab={this.isIssueTab} {...this.state} />
        <Table {...this.props} {...this.state} detailMethod={this.detailMethod} />
      </div>
    );
  }
}
