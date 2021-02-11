/** @format */

import React from "react";
import "./AppHeader.css";
import { alertSvgImage } from "../../images/SvgImage";
export default class AppHeader extends React.Component {
  render() {
    let { issueCount, isIssueTab } = this.props;
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
