import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookShelf: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount(){
    if(this.props.book.shelf) {
      this.setState({bookShelf: this.props.book.shelf})
    } else {
      this.setState({bookShelf: 'none'})
    }
  }

  handleChange(event) {
    let newShelf = event.target.value;
    let currentShelf = this.state.bookShelf;
    let bookId = this.props.book.id;

    if(newShelf === this.state.bookShelf) {
      return;
    } else {
      this.props.changeShelf(bookId, currentShelf, newShelf);
    }
  }

  render () {
    const { book } = this.props;
    let authors;
    let imagePath;

    //Some API results don't have an ImageLinks or an Author property, this handles it
      if(book.imageLinks) {
        imagePath = book.imageLinks.thumbnail;
      } else {
        imagePath = './no-book-art.jpg'
      }

      if(book.authors) {
        authors = book.authors;
      } else {
        authors = ['No Authors In this API']
      }


    return (
    <div className='book'>
      <div className='book-top'>
        <img className='book-cover' src={imagePath} alt= {book.title + 'Cover Art'}  />

        <div className='book-shelf-changer'>

            <select defaultValue={this.state.bookShelf}
              onChange={ this.handleChange}
             >
              <option disabled> Choose A Shelf </option>
              <option value='currentlyReading'> Currently Reading </option>
              <option value='read'> Read </option>
              <option value='wantToRead'> Want To Read </option>
              <option value='none'> None </option>
            </select>
        </div>

      </div>

      <div className='book-title'> {book.title} </div>
      <div className='book-authors'>
        {
          authors.map((author, index) => (
            <p key={index}> {author} </p>
          ))
        }
      </div>

    </div>
    );
  }
}

Book.PropTypes = {
  book: PropTypes.object.isRequired
}

export default Book;
