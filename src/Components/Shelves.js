import React from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types';

//create shelf array so that we can later add ability to dynamically create new shelves if desired
const shelves = [
	{
		'id': 'wantToRead',
		'name': 'Want to Read' 
		},
	{
		'id': 'currentlyReading',
		'name': 'Currently Reading' 
		},	
	{
		'id': 'read',
		'name': 'Read' 
		},
]	

class Shelves extends React.Component {
	static propTypes = {
		books: PropTypes.array.isRequired
	}
	
render() {
	const {books, updateShelves} = this.props	
	
	return (
	<div>
	{shelves.map((shelf, index) => (
		<div key={shelf.id} className="bookshelf">
			<h2 className="bookshelf-title">{shelf.name}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">		
					{books.filter((book) => book.shelf === shelf.id).map(book => (<Book book={book}  key={book.id} updateShelf={updateShelves}/>))}
				</ol>
			</div>			
		</div>
	))}
	</div>
	)
}
}

export default Shelves