/** @format */
import React from "react";
import TableHeader from "./TableHeader";
import Pagination from "../Pagination";
import Loading from "../LoadingComponent";
import TableRow from "./TableRow";
import "./table.css";
import { allIssues } from "../../AppService";
export default class Table extends React.Component {
  state = {
    tab: "open",
    currentPage: 1,
    DataJSON: [],
    loading: false,
  };
  perPage = 4;

  fetchData = async ({ tab, numberPage = 1 }) => {
    this.setState({ loading: true });
    let { data } = await allIssues({
      state: tab,
      page: numberPage,
      per_page: this.perPage,
      direction: "asc",
    });
    this.setState({ loading: false, DataJSON: data, currentPage: numberPage, tab });
  };
  componentDidMount = () => {
    this.fetchData({ tab: this.state.tab });
  };
  changeCurrentPage = (numberPage) => {
    let { tab } = this.state;
    this.fetchData({ tab, numberPage });
  };
  tabs = (tab) => {
    this.fetchData({ tab });
  };
  onMouseOver = (value) => {
    this.setState({ selected: value });
  };
  onMouseLeave = () => {
    this.setState({ selected: "" });
  };
  render() {
    let { currentPage, tab, loading, DataJSON = [] } = this.state;
    let { closedCount, openCount } = this.props;
    let pagingCount = tab == "open" ? Math.ceil(openCount / this.perPage) : Math.ceil(closedCount / this.perPage);

    return (
      <div className="tableContainerStyle">
        <Loading loading={loading} />
        <TableHeader {...this.props} {...this.state} tabs={this.tabs} />
        <div className="rowContainerStyle">
          {DataJSON.map((value, index) => {
            return (
              <TableRow {...this.props} {...this.state} totalLength={DataJSON.length} data={value} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver} index={index} />
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={pagingCount}
          totalPaging={5}
          changeCurrentPage={this.changeCurrentPage}
          style={{ viewStyle: { display: "flex", padding: 5, marginTop: 15, justifyContent: "center" } }}
        />
      </div>
    );
  }
}
