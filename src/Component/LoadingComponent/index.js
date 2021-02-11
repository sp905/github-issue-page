/** @format */

import React from "react";
import ReactLoading from "react-loading";
import "./loading.css";
export default class Loading extends React.Component {
  render() {
    let { loading } = this.props;
    return (
      <>
        {loading ? (
          <div className="loadingStyle">
            <ReactLoading type="spin" color={"green"} height={30} width={30} />
          </div>
        ) : null}
      </>
    );
  }
}
