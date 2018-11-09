import React from 'react'
import * as BooksAPI from './util/BooksAPI'
import './App.css'
import Shelves from './Components/Shelves.js'
import { Route, Link } from 'react-router-dom'
import Search from './Components/Search.js'


class BooksApp extends React.Component {

	state = {
		books: [],
		queriedBooks: [],
		query: ''
	}

	//get books from database
	componentDidMount(){
		BooksAPI.getAll().then((books) => {
			this.setState({ books })
		})
	}
	
	//update shelves with modifications from both main page and search page
	updateShelves = (book, shelf) => {
		BooksAPI.update(book, shelf).then(
			rerender => (BooksAPI.getAll().then((books) => {
			this.setState({ books })
			this.shelfInitialize(this.state.queriedBooks)
		}))
		)
	}

	//search page functionality to display book list matching search string
	bookSearch = (query) => {
		if (query) {
		BooksAPI.search(query).then((books) => {
			if (books.error !== 'empty query') {
				this.setState({ queriedBooks: books })
				this.shelfInitialize(this.state.queriedBooks)
				}
			else {this.setState({ queriedBooks: [] })}
			})
		}
		else { this.setState({ queriedBooks: [] }) }
	}	

	//resets state of search page so that when exiting and returning the prior searched books are not present
	resetState = () => {
		this.setState({ query: '', queriedBooks: []})
	}
	
	//sets shelf of queried books to be passed to Search page. Iniitially sets all shelf values for query results to None and then updates them if a match is found on book shelf 
	shelfInitialize = (queriedBooks) => {
		for (let queriedBook of queriedBooks) {
			queriedBook.shelf = 'none'
		}
		
		for (let queriedBook of queriedBooks) {
			for (let bk of this.state.books) {
				if (queriedBook.id === bk.id) {queriedBook.shelf = bk.shelf}
				}
			}
		this.setState({queriedBooks: queriedBooks})
		}
		
render() {
	return (
		<div className="app">
			<Route exact path='/' render={() => (
				<div className="list-books">
					<div className="list-books-title">
					  <h1>MyReads</h1>
					</div>	
					<div className="list-books-content">
							<Shelves 
							books={this.state.books}
							updateShelves={this.updateShelves}
							/>
					</div>
					
					<div className="open-search">
					  <Link to='/search/'
						onClick={this.resetState}
					>Add a book</Link>
					</div>
				
				</div>
				)}/>
		  
			<Route path='/search' render={() => (		
				<div>
				<Search
					queriedBooks={this.state.queriedBooks}
					 bookSearch={(query) => this.bookSearch(query)}
					 updateShelves={this.updateShelves}
					/>
				</div>
				)}
			/>
		</div>
	)
}
}
export default BooksApp

/* 
	Took queues from the following projects
		https://github.com/nidhigaday/My-Reads
		https://github.com/djarrin/MyReads
*/