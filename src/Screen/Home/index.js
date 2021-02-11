/** @format */

import React from "react";
import AppHeader from "../../Component/AppHeader";
import { Table } from "../../Component/Table";
import { Details } from "../Details";
import "./home.css";
import { AllIssues } from "../../AppService";
export default class Home extends React.Component {
  state = { issueTabs: true };
  componentDidMount = async () => {
    this.setState({ loading: true });
    const { data = [] } = await AllIssues({ state: "all" });
    let openCount = 0;
    let closedCount = 0;
    data.map((value) => {
      if (value.state === "open") {
        openCount++;
      }
      if (value.state === "closed") {
        closedCount++;
      }
    });
    this.setState({ openCount, closedCount, issueCount: data.length, oldData: data, loading: false });
  };
  isIssueTab = () => {
    this.setState({ issueTabs: true });
  };
  detailMethod = (value) => {
    this.setState({ detailData: value, issueTabs: false });
  };
  render() {
    let { issueTabs, detailData } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <AppHeader {...this.props} isIssueTab={this.isIssueTab} {...this.state} />
        {issueTabs ? (
          <Table {...this.props} {...this.state} detailMethod={this.detailMethod} />
        ) : (
          <Details routing={this.routing} data={detailData} />
        )}
      </div>
    );
  }
}
