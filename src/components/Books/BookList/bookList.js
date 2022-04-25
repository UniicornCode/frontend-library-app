import React, {Component} from 'react';
import {Link} from "react-router-dom";
import BookTerm from "../BookTerm/bookTerm";
import ReactPaginate from "react-paginate";

class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {

        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset);
        console.log(books, pageCount)


        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available Copies</th>
                            </tr>
                            </thead>
                            <tbody>
                                {books}
                            </tbody>
                        </table>
                    </div>

                    <ReactPaginate
                        containerClassName="pagination justify-content-center"
                        breakClassName="page-item"
                        breakLabel={<a className="page-link">...</a>}
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        pageClassName="page-item"
                        previousClassName="page-item"
                        nextClassName="page-item"
                        pageLinkClassName="page-link"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                    />

                    <div className="col mb-3">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <Link className={"btn btn-block btn-dark"} to={"/books/add"}>Add new book</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term) => {
            return (
                <BookTerm term={term}
                          onDelete={this.props.onDelete}
                          onEdit={this.props.onEdit}
                          onMark={this.props.onMark}
                />
            )
        }).filter((books, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}

export default BookList;