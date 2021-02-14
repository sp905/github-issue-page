/** @format */

import React from "react";
export default class ReactPagination extends React.Component {
  state = {
    firstThreeArray: [1],
    lastNumber: "",
    showEllipis: true,
  };
  componentDidMount() {
    if (this.props.totalPages <= 5) {
      var fArray = [];
      for (var i = 1; i <= this.props.totalPages; i++) {
        fArray.push(i);
      }
      this.setState({ firstThreeArray: fArray });
    } else {
      if (this.props.currentPage < 3) {
        this.setState({ firstThreeArray: [1, 2, 3, 4, 5] });
      } else {
        var fArray = [];
        var index = 1;
        for (let j = this.props.currentPage; j >= 0; j--) {
          fArray.push(j);
          if (index === 3) {
            break;
          }
          index++;
        }

        fArray.reverse();
        this.setState({ firstThreeArray: fArray });
      }
      this.setState({ lastNumber: this.props.totalPages });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.totalPages <= 5) {
      var fArray = [];
      for (var i = 1; i <= nextProps.totalPages; i++) {
        fArray.push(i);
      }
      this.setState({ firstThreeArray: fArray });
    } else {
      if (this.props.currentPage !== nextProps.currentPage || this.props.totalPages !== nextProps.totalPages) {
        if (nextProps.currentPage < 5) {
          this.setState({ firstThreeArray: [1, 2, 3, 4, 5] });
        } else {
          var fArray = [];
          fArray.push(nextProps.currentPage - 3);
          fArray.push(nextProps.currentPage - 2);
          fArray.push(nextProps.currentPage - 1);
          fArray.push(nextProps.currentPage);
          if (nextProps.currentPage + 1 < nextProps.totalPages) {
            fArray.push(nextProps.currentPage + 1);
          }
          this.setState({ firstThreeArray: fArray });
        }
        this.setState({ lastNumber: nextProps.totalPages });
      }
    }
  }
  prev = () => {
    if (this.props.currentPage > 1) {
      this.props.changeCurrentPage(this.props.currentPage - 1);
    }
  };
  next = () => {
    if (this.props.currentPage < this.props.totalPages) {
      this.props.changeCurrentPage(this.props.currentPage + 1);
    }
  };
  changeCurrentPage = (no) => {
    this.props.changeCurrentPage(no);
  };

  isactive = (currentPage) => {
    if (this.props.currentPage == currentPage) {
      return true;
    }
    return false;
  };
  showLastPagi = () => {
    if (this.props.currentPage !== this.props.totalPages) {
      return (
        <a
          className={this.isactive(this.props.totalPages) ? "is-active" : ""}
          onClick={() => {
            this.changeCurrentPage(this.props.totalPages);
          }}
        >
          <li>{this.props.totalPages}</li>
        </a>
      );
    }
  };
  showPrev = () => {
    return (
      <a
        onClick={this.props.currentPage != 1 ? this.prev : null}
        style={{
          display: "flex",
          alignItems: "center",
          paddingRight: 3,
          cursor: "pointer",
          color: this.props.currentPage != 1 ? "blue" : "black",
        }}
      >
        <div style={{ fontSize: 14 }}>{`<Prev`}</div>
      </a>
    );
  };
  showNext = () => {
    return (
      <a
        onClick={this.props.currentPage < this.props.totalPages ? this.next : null}
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 7,
          cursor: "pointer",
          color: this.props.currentPage < this.props.totalPages ? "blue" : "black",
        }}
      >
        <div style={{ fontSize: 14 }}>{"Next>"}</div>
      </a>
    );
  };
  buttonClick = ({ no, currentPage,totalPages, boxStyle }) => {
    if(totalPages===no){
      return null
    }
    return (
      <div
        onClick={() => this.changeCurrentPage(no)}
        style={{
          cursor: "pointer",
          borderRadius: 5,
          paddingTop: 3,
          paddingBottom: 3,
          paddingLeft: 10,
          paddingRight: no > 90 ? 20 : 10,
          width: 25,
          color: no === currentPage ? "white" : "black",
          backgroundColor: no === currentPage ? "#59da59" : "white",
          border: no === currentPage ? `1px solid white` : `1px solid gray`,
          marginLeft: 5,
          textAlign: "center",
          ...boxStyle,
        }}
      >
        {no}
      </div>
    );
  };
  render() {
    let { firstThreeArray = [1] } = this.state;
    if (!firstThreeArray.length) {
      firstThreeArray.push(1);
    }
    let { currentPage, style, totalPaging, totalPages } = this.props || {};
    let { viewStyle, boxStyle } = style || {};
    return (
      <div style={viewStyle}>
        {this.showPrev()}
        {currentPage > 5 ? (
          <div style={{ display: "flex" }}>
            {this.buttonClick({ no: 1, currentPage, boxStyle })}
            <div style={{ paddingLeft: 5, paddingRight: 2 }}>...</div>
          </div>
        ) : null}
        {firstThreeArray.map((no, index) => {
          return this.buttonClick({ no,totalPages, currentPage, boxStyle });
        })}
        {totalPaging < totalPages ? (
          <div style={{ display: "flex" }}>
            <div style={{ paddingLeft: 5, paddingRight: 2 }}>...</div>
            {this.buttonClick({ no: totalPages, currentPage, boxStyle })}
          </div>
        ) : null}
        {this.showNext()}
      </div>
    );
  }
}
ReactPagination.defaultProps = {
  theme: "default",
  currentPage: 1,
  totalPages: 15,
};
