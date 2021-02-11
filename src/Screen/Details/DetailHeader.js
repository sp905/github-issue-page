/** @format */

import React from "react";
import moment from "moment";
import "./detailHeader.css";
import { alertSvgImage } from "../../images/SvgImage";
export default class DetailHeader extends React.Component {
  render() {
    let { data = {} } = this.props;
    let { title, state, number, created_at, closed_at, comments, user = {} } = data || {};
    let date = void 0;
    let color = "";
    if (state === "open") {
      date = created_at;
      color = "green";
    } else if (state === "closed") {
      date = closed_at;
      color = "red";
    }
    date = moment(date).fromNow();

    return (
      <div>
        <div className="containerStyleDetail">
          {title} <span className="numberStyle">{`#${number}`}</span>
        </div>
        <div className="detailHeaderContainerStyle">
          <div className="alertSvgStyle">{alertSvgImage("white")}</div>
          <div className={state === "open" ? "openBatchStyle" : "closeBatchStyle"}>
            {state && state.charAt(0).toUpperCase() + state.slice(1)}
          </div>
          <div className="logintextstyle">{user && user.login}</div>
          <div className="issueTextStyle">{`${state} this issue ${date}`}</div>
          <div className="bubbleStyle" />
          <div className="commentsTextStyle">{`${comments} comments`} </div>
        </div>
      </div>
    );
  }
}
