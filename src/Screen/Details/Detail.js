/** @format */

import React from "react";
import Loading from "../../Component/LoadingComponent";
import AppHeader from "../../Component/AppHeader";

import { commentData} from "../../AppService";
import "./detail.css";
import DetailHeader from "./DetailHeader";
import DetailRow from "./DetailRow";
export default class DetailComponent extends React.Component {
  state = {};
  async componentDidMount() {
    let {  location: { detailData } = {} } = this.props;
    if (!detailData) {
      detailData = JSON.parse(localStorage.getItem("data"));
    }
    let { number } = detailData || {};
    this.setState({ loading: true });
    const { data: commentsData = [] } = await commentData({ number });
    this.setState({ data: detailData, commentsData, loading: false });
  }
  isIssueTab = () => {
    this.props.history.push({
      pathname: "/",
    });
  };
  render() {
    let { data = {}, commentsData = [], loading } = this.state;

    return (
      <div style={{ overflow: "hidden", flex: 1 }}>
        <AppHeader {...this.props} isIssueTab={this.isIssueTab} {...this.state} />
        <Loading loading={loading} />
        {loading ? null : <DetailHeader {...this.props} data={data} />}
        {commentsData.length ? (
          commentsData.map((value) => {
            return <DetailRow data={value} />;
          })
        ) : (
          <div className="commentTextStyle">No Comment</div>
        )}
      </div>
    );
  }
}
