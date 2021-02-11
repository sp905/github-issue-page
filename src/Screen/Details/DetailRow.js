/** @format */

import React from "react";
import moment from "moment";
import "./detailsRow.css";
export default class DetailComponent extends React.Component {
  render() {
    let { data = {} } = this.props;
    let { body, created_at, user: { avatar_url, login } = {} } = data || {};
    created_at = moment(created_at).fromNow();
    return (
      <div className="detailContainerStyle">
        <img src={avatar_url} className="avtarStyle" />
        <div className="traingleStyle" />
        <div className="detailHeaderStyle">
          <div className="detailBodyStyle">
            <span className="loginTextStyle">{login}</span>
            <div className="commentedStyle">{`commented ${created_at}`}</div>
          </div>
          <div className="bodyStyle">{body}</div>
        </div>
      </div>
    );
  }
}
