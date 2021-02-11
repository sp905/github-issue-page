/** @format */

import React from "react";
import Loading from "../../Component/LoadingComponent";
import { CommentData } from "../../AppService";
import "./detail.css";
import DetailHeader from "./DetailHeader";
import DetailRow from "./DetailRow";
export default class DetailComponent extends React.Component {
  state = {};
  async componentDidMount() {
    let { data } = this.props;
    let { number } = data || {};
    this.setState({ loading: true });
    const { data: commentsData = [] } = await CommentData({ number });
    this.setState({ data, commentsData, loading: false });
  }

  render() {
    let { data = {}, commentsData = [], loading } = this.state;
    if (loading) {
      return <Loading loading={loading} />;
    }
    return (
      <div style={{overflow:"hidden",flex:1}}>
        <DetailHeader {...this.props} data={data} />
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
