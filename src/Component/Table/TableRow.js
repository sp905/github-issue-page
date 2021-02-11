/** @format */

import React from "react";
import moment from "moment";
import "./tableRow.css";
import { alertSvgImage } from "../../images/SvgImage";
export default class TableRow extends React.Component {
  render() {
    let { data = {}, index, selected = "", tab, totalLength, onMouseOver, onMouseLeave, detailMethod } = this.props;
    let svgColor = tab == "open" ? "rgb(89, 218, 89)" : "#f24f4f";
    let { created_at, number, user: { login } = {}, state, closed_at } = data;
    let date;
    if (tab === "open") {
      date = created_at;
    } else if (tab === "closed") {
      date = closed_at;
    }
    return (
      <div
        onClick={() => detailMethod(data)}
        onMouseOver={() => onMouseOver(index)}
        onMouseLeave={() => onMouseLeave()}
        className={[
          totalLength - 1 === index ? "listLastRowStyle" : "listRowStyle",
          selected === index ? "onMouseOver" : "onMouseLeave",
        ].join(" ")}
      >
        <div style={{ flexDirection: "row", display: "flex" }}>
          {alertSvgImage(svgColor)}
          <div className="titleTextStyle">{data.title}</div>
        </div>
        <div className="dateshowTextStyle">{`#${number} ${state} ${moment(date).fromNow()} by ${login}`}</div>
      </div>
    );
  }
}
