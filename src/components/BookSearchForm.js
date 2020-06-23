import React from 'react';
import logo from './styles/logo.svg';
import BooksLogo from './styles/BooksLogo.png';
import './styles/App.css';
import Axios from 'axios';
import Item from './Item'

class BookSearch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            books: [],
            searchTerm: 'Harry Potter',
            error: '',
            loading: true,
            placeholder: 'Harry Potter'
        }
    }

    componentDidMount(){
        Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`)
        .then(this.handleSuccess)
        .catch(this.handleError)
    }

    handleSuccess = (response) => {
        this.setState({books: response.data.items, loading: false});
    }

    handleError = (error) => {
        this.setState({error: error, loading: false});
        console.log(error);
    }

    handleInput = (event) => {
        this.setState({searchTerm: event.target.value}); 
    } 

    handleSearch = (event) => {
        event.preventDefault();
        
        if(this.state.searchTerm.trim() !== '' ){
            this.setState({placeholder: this.state.searchTerm, loading: true});
            Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchTerm}`)
            .then(this.handleSuccess)
            .catch(this.handleError)      
        }
    }

    handelRender = () => {
        if(this.state.loading){
            return (
                <div>
                    <p className='message'>
                        Application is loading, please wait...
                    </p>
                    <img src={logo} className="App-logo" alt="logo" />
                 </div>
            );
        }
        if (this.state.error){
            return (
                <div className='message'> 
                    Sorry, we have an Error, look at the console for details
                </div>
            );
        }
        if(this.state.books){
            return this.state.books.map(el => {
                return (
                    <div key={el.id}>
                        <Item book={el} />
                    </div>
                );
            });
        } else {
            return (
                <div className='message'>
                    No books found for: {`'${this.state.placeholder}'`}
                </div>
            );
        }
    }

    render(){
        return (
            <div className="App">
                <img className='books-logo' src={BooksLogo} alt=''></img>
                <form onSubmit={this.handleSearch}>
                    <input 
                        value={this.state.searchTerm}
                        className='input'
                        type='text'
                        placeholder={this.state.placeholder}
                        onChange={this.handleInput}>
                    </input>
                    <button 
                        type="submit"
                        className='button'>
                        Search
                    </button>
                </form>
                <div className='list'>
                    {this.handelRender()}
                </div>
            </div>
        );
    }
}

export default BookSearch;
