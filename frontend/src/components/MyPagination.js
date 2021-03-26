import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class MyPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.activePage
    };
  }

  handlePageChange(pageNumber) {
    console.log('count ', this.props.totalItemsCount)
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });


    this.props.history.push(`/user/my/profile/page/${pageNumber}`)


    // <LinkContainer key={x + 1}
    //   to={
    //     screen == 2 ? `/user/my/favorites/${x + 1}`
    //       : screen == 3 ? `/products/user/${id}/${x + 1}`
    //         : `/user/my/profile/page/${x + 1}`}>
    //   <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
    // </LinkContainer>
  }

  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.props.itemsCountPerPage}
          totalItemsCount={this.props.totalItemsCount}
          // pageRangeDisplayed= {5}
          pageRangeDisplayed={3}  // množstvo zobrazených stránok na klikanie
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default MyPagination