import './App.css';
import Header from '../Header/header'
import Categories from '../Categories/categories'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Component} from "react";
import BooksList from "../Books/BookList/bookList";
import ELibraryRepository from "../../repository/eLibraryRepository";
import BookAdd from "../Books/BookAdd/bookAdd";
import data from "bootstrap/js/src/dom/data";
import BookEdit from "../Books/BookEdit/bookEdit";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route exact path= {"/books"} element={
                                <BooksList
                                    books={this.state.books}
                                    onDelete={this.deleteBook}
                                    onEdit={this.getBook}
                                    onMark={this.markBook}
                                />
                            }/>
                            <Route exact path= {"/"} element={
                                <BooksList
                                    books={this.state.books}
                                    onDelete={this.deleteBook}
                                    onEdit={this.getBook}
                                    onMark={this.markBook}
                                />}
                            />
                            <Route exact path={"/categories"} element={ <Categories categories={this.state.categories}/>}/>
                            <Route exact path={"/books/add"} element={
                                <BookAdd
                                    authors={this.state.authors}
                                    categories={this.state.categories}
                                    onAddBook={this.addBook}/>
                            }/>
                            <Route exact path={"/books/edit/:id"} element={
                                <BookEdit
                                    book={this.state.selectedBook}
                                    authors={this.state.authors}
                                    categories={this.state.categories}
                                    onEditBook={this.editBook}
                                />
                            }/>
                        </Routes>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () => {
        ELibraryRepository.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        ELibraryRepository.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    loadAuthors = () => {
        ELibraryRepository.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    addBook = (name, category, author, availableCopies) => {
        ELibraryRepository.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        ELibraryRepository.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook : data.data
                })
            })
    }

    deleteBook = (id) => {
        ELibraryRepository.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    editBook = (id, name, category, author, availableCopies) => {
        ELibraryRepository.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    markBook = (id) => {
        ELibraryRepository.markAsTaken(id)
            .then(() => {
                this.loadBooks();
            })
    }
}

export default App;
