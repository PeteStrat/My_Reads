import React, { Component } from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';


class BookShelf extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: this.props.books,
      shelfDisplayName: this.props.shelfDisplayName
    }
  }

  componentWillReceiveProps(nextProps){
    /**
     * Handle the state of books depending on if it's
     * in a named shelf vs no shelf
     */
    if(nextProps.allBooks && nextProps.books.length > 0) {
      let {allBooks} = nextProps;
      let searchResults = nextProps.books;

      searchResults.forEach(book => {
        let id = book.id;

        if(allBooks[id]){
          book.shelf = allBooks[id]['shelf']
        }
      });
      this.setState({books: searchResults});

    } else {
      this.setState({books: nextProps.books});
    }
  }


  render() {
    let books = this.state.books;

    return(
      <div className='bookshelf'>
        <div className='bookshelf-title'> <h1> {this.props.shelfDisplayName} </h1> </div>

        <div className='bookshelf-books'>
            <ol className='books-grid'>
              {
                books.map((book) => (
                  <li key={book.id}>
                    <Book
                      book= {book}
                      changeShelf = {this.props.onChangeShelf}
                      shelfDisplayName = {this.state.shelfDisplayName}
                    />
                  </li>
                ))
              }
            </ol>
        </div>
      </div>
    );
  }

}

BookShelf.PropTypes = {
  books: PropTypes.array.isRequired,
  shelfDisplayName: PropTypes.string.isRequired
}


export default BookShelf;
