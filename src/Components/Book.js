import React from 'react'

//Copied URL code for background image if not found - https://stackoverflow.com/questions/32909488/how-do-i-make-a-placeholder-image-in-html-if-the-original-image-hasnt-been-foun

class Book extends React.Component {
  render() {	
	const {book, updateShelf} = this.props
	if (book.imageLinks === undefined ) { book.imageLinks = ['thumbnail']; book.imageLinks.thumbnail = 'http://goo.gl/vyAs27'}
	if (book.authors === undefined) {book.authors = ['*unkonwn*']}
	
	return(
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
					</div>
					<div className="book-shelf-changer">
						<select value={book.shelf} onChange={(event) => updateShelf(book, event.target.value)}>
							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>				
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{book.authors}</div>
			</div>
		</li>
	)
  }
}

export default Book