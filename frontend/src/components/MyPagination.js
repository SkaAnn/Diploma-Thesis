import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class MyPagination extends Component {
  constructor(props) {
    console.log('som tu v mypag construcitor')
    super(props);
    this.state = {
      activePage: this.props.activePage || 1
    };
  }

  handlePageChange(pageNumber) {
    console.log('count ', this.props.totalItemsCount)
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });

    if (this.props.screen === 0) {
      // 1 stvorica
      if (this.props.sortKey && this.props.keyword && this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/search/${this.props.keyword}/filter/${this.props.filter}/page/${pageNumber}`) }
      // 3 trojice (tam kde je page)
      else if (this.props.sortKey && this.props.keyword && !this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/search/${this.props.keyword}/page/${pageNumber}`) }
      else if (this.props.sortKey && !this.props.keyword && this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/filter/${this.props.filter}/page/${pageNumber}`) }
      else if (!this.props.sortKey && this.props.keyword && this.props.filter) { this.props.history.push(`/search/${this.props.keyword}/filter/${this.props.filter}/page/${pageNumber}`) }
      // 3 dvojice (tam kde je page)
      else if (this.props.sortKey && !this.props.keyword && !this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/page/${pageNumber}`) }
      else if (!this.props.sortKey && this.props.keyword && !this.props.filter) { this.props.history.push(`/search/${this.props.keyword}/page/${pageNumber}`) }
      else if (!this.props.sortKey && !this.props.keyword && this.props.filter) { this.props.history.push(`/filter/${this.props.filter}/page/${pageNumber}`) }
      // 1 jednoica
      else { this.props.history.push(`/page/${pageNumber}`) }
    }
    if (this.props.screen === 1) { this.props.history.push(`/user/my/profile/page/${pageNumber}`) }
    if (this.props.screen === 2) { this.props.history.push(`/user/my/favorites/${pageNumber}`) }
    if (this.props.screen === 3) { this.props.history.push(`/products/user/${this.props.id}/${pageNumber}`) }

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