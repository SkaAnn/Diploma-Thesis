import React, { Component } from "react";
import Pagination from "react-js-pagination";

class MyPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: this.props.activePage || 1
    };
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });

    if (this.props.screen === 0) {
      if (this.props.sortKey && this.props.keyword && this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/search/${this.props.keyword}/filter/${this.props.filter}/page/${pageNumber}`) }
      // *****
      else if (this.props.sortKey && this.props.keyword && !this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/search/${this.props.keyword}/page/${pageNumber}`) }
      else if (this.props.sortKey && !this.props.keyword && this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/filter/${this.props.filter}/page/${pageNumber}`) }
      else if (!this.props.sortKey && this.props.keyword && this.props.filter) { this.props.history.push(`/search/${this.props.keyword}/filter/${this.props.filter}/page/${pageNumber}`) }
      // *****
      else if (this.props.sortKey && !this.props.keyword && !this.props.filter) { this.props.history.push(`/sort/${this.props.sortKey}/page/${pageNumber}`) }
      else if (!this.props.sortKey && this.props.keyword && !this.props.filter) { this.props.history.push(`/search/${this.props.keyword}/page/${pageNumber}`) }
      else if (!this.props.sortKey && !this.props.keyword && this.props.filter) { this.props.history.push(`/filter/${this.props.filter}/page/${pageNumber}`) }
      // *****
      else { this.props.history.push(`/page/${pageNumber}`) }
    }
    if (this.props.screen === 1) { this.props.history.push(`/my/profile/page/${pageNumber}`) }
    if (this.props.screen === 2) { this.props.history.push(`/my/favorites/${pageNumber}`) }
    if (this.props.screen === 3) { this.props.history.push(`/products/user/${this.props.id}/${pageNumber}`) }
  }

  render() {
    return (
      <div className='mt-3'>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.props.itemsCountPerPage}
          totalItemsCount={this.props.totalItemsCount}
          pageRangeDisplayed={3}  // {5} amount of pages displayed in row
          onChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default MyPagination