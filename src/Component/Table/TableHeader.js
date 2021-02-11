/** @format */

import React from "react";
import "./TableHeader.css";
export default class TableHeader extends React.Component {
  renderImage = ({ value }) => {
    let { tab } = this.props;
    return (
      <img
        src={require(`../../images/check.svg`)}
        className={value === tab ? "checkImageWithOpecityStyle" : "checkImageStyle"}
      />
    );
  };

  tabView = ({ count = 0, selectedTab, text }) => {
    let { tabs, tab } = this.props;
    return (
      <div
        className={tab === selectedTab ? "tabSelectedChildStyle" : "tabNotSelectedChildStyle"}
        onClick={() => tabs(selectedTab)}
      >
        {`${count} ${text}`}
        {this.renderImage({ value: selectedTab })}
      </div>
    );
  };
  render() {
    let { openCount = 0, closedCount = 0 } = this.props;
    return (
      <div className="tabStyle">
        {this.tabView({ count: openCount, text: "Open", selectedTab: "open" })}
        {this.tabView({ count: closedCount, text: "Closed", selectedTab: "closed" })}
      </div>
    );
  }
}
