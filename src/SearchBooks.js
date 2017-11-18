import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';


class SearchBooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      unsortedBooks: []
    }

    this.searchAPI = this.searchAPI.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery = (query) => {
    let trimmedQuery = query.trim();
    /**
     * Removed trimmedQuery from this.setState because it
     * would not allow the input field to accept multiple words
     * (i.e. couldn't search for 'web development')
     */
    this.setState({query: query});
    this.searchAPI(trimmedQuery);
  }

  searchAPI = (query) => {
    if(query.length < 1) {
      this.setState( { unsortedBooks: [] } );
      return;
    }

    BooksAPI.search(query, 5).then((results) => {
      this.setState({unsortedBooks: results});
    }).catch((error) => {
      console.error('Error in API call \n, ', error);
    });
  }

  render() {
    const {query} = this.state;

    return (
      <div>
        <div className='search-books-bar'>
          <a href='/' className='close-search'> </a>
          <form >
            <div className='search-books-input-wrapper'>
                <input
                  placeholder='Search by Title or Author'
                  value = {query}
                  onChange={(event)=> this.updateQuery(event.target.value)}
                />
            </div>
          </form>
        </div>

        <div className='search-books-results'>
            <BookShelf
              shelfDisplayName='Search Results'
              books = {this.state.unsortedBooks}
              allBooks = {this.props.allBooks}
              onChangeShelf = {this.props.onChangeShelf}
            />
        </div>

      </div>
    )
  }
}


export default SearchBooks;
