import logo from './logo.svg';
import './App.css';
import {Component} from "react";

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     books: []
  //   }
  // }

  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className={"container"}>
              <Routes>
                <Route exact path={"/books"} element={<BooksList books={this.state.books}/>}/>
              </Routes>
            </div>
          </main>
        </Router>
    );
  }

  // componentDidMount() {
  //   this.loadBooks();
  // }
  //
  // loadBooks = () => {
  //   ELibraryRepository.fetchBooks()
  //       .then((data) => {
  //         this.setState({
  //           books: data.data
  //         })
  //       });
  // }
}

export default App;
