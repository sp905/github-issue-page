/** @format */

import React from "react";
import "./AppHeader.css";
import { alertSvgImage } from "../../images/SvgImage";
import {  totalCountMethod } from "../../AppService";
export default class AppHeader extends React.Component {
  state = {};
  componentDidMount = async () => {
    this.setState({ loading: true });
    const {totalCount} = totalCountMethod();
    this.setState({ issueCount:totalCount });
  };
  render() {
    let { isIssueTab, totalCount } = this.props;
    let { issueCount } = this.state;
    if (!issueCount) {
      issueCount = totalCount;
    }
    return (
      <div className="tabContainerStyle">
        <div onClick={isIssueTab} className="tabChildStyle">
          {alertSvgImage()}
          <div className="tabIssueTextStyle">Issues</div>
          <div className="tabCountStyle">{issueCount}</div>
        </div>
      </div>
    );
  }
}
