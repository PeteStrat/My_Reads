import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
    allBooks: {}
  }

  componentWillMount() {

    this.setState((prevState) => {
      BooksAPI.getAll().then((books) => {
        books.forEach((book) => {
          let currentShelf = book.shelf;
          prevState[currentShelf] = prevState[currentShelf].concat(book);
          prevState.allBooks[book.id] = book;
        });
        this.setState(prevState);
      });
    });

  }

  changeShelf = (bookId, currentShelf, newShelf) => {
    let currentState = this.state;
    let oldShelf = currentState[currentShelf];
    let nextShelf = currentState[newShelf];

    //Change Shelf Locally for optimal user experience
    oldShelf.forEach((currentBook, index) => {
      if(currentBook.id === bookId) {
        currentBook.shelf = newShelf;
        oldShelf.splice(index, 1);
        nextShelf.push(currentBook);
        return;
      }
    });

    this.setState(currentState);

    //Change Shelf on API for future use
    BooksAPI.get(bookId).then((book) => {
      BooksAPI.update(book, newShelf);
    }).catch((error) => {
      console.error('Bad API, \n', error)
    });

  }


  render() {
    return (
      <div className="App">
        <Route exact path='/' render={ ()=> (
          <div>
            <div className='list-books-title'> <h1> MyReads </h1> </div>

            <BookShelf
              shelfDisplayName="Currently Reading"
              shelfName="currentlyReading"
              books= {this.state.currentlyReading}
              onChangeShelf = {this.changeShelf}
            />

            <BookShelf
              shelfDisplayName="Want To Read"
              shelfName="wantToRead"
              books={this.state.wantToRead}
              onChangeShelf = {this.changeShelf}
            />

            <BookShelf
              shelfDisplayName="Read"
              shelfName="read"
              books={this.state.read}
              onChangeShelf = {this.changeShelf}
            />

            <div className='open-search'> <a href='/search'> </a>  </div>
          </div>
        )}/>

        <Route exact path='/search' render={ () => (
          <SearchBooks
            onChangeShelf = {this.changeShelf}
            allBooks = {this.state.allBooks}
          />
        )}/>

      </div>
    );
  }
}

export default App;
