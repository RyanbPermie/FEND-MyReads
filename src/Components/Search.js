import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Book from './Book.js'

class Search extends React.Component {

	static propTypes = {
		queriedBooks: PropTypes.array.isRequired
	}
	

	render() {	
		const {queriedBooks, bookSearch, updateShelves} = this.props
		return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
					onChange={(event) => bookSearch(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				{queriedBooks.map(book => (<Book book={book}  key={book.id} updateShelf={updateShelves}/>))}
			  </ol>
            </div>
          </div>
        )
	}
}
	export default Search