import React, {useState, useEffect} from 'react';
import logo from './styles/logo.svg';
import BooksLogo from './styles/BooksLogo.png';
import './styles/App.css';
import Axios from 'axios';
import Item from './Item'

const BookSearch = () => {
    const [books, setBooks] = useState([])
    const [searchTerm, setSearchTerm] = useState('Harry Potter')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)


    const handleSuccess = (response) => {
        setBooks(response.data.items)
        setLoading(false)
    }  

    const handleError = (error) => {
        setLoading(false)
        setError(error)
    }

    const handleInput = (event) => {
        if(event.target.value){  
            setSearchTerm(event.target.value)  
        }else{
            setSearchTerm('')  
        }
        
    } 
    useEffect(() => {
        Axios.get(`https://www.googleapis.com/books/v1/volumes?q=HarryPotter`)
        .then(handleSuccess)
        .catch(handleError)
    }, [])    
    

    const handleSearch = (event) => {
        event.preventDefault();
        
        if(searchTerm.trim() !== '' ){
            setLoading(true)
            Axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
            .then(handleSuccess)
            .catch(handleError)      
        }
    }

    const handelRender = () => {
        if(loading){
            return (
                <div>
                    <p className='message'>
                        Application is loading, please wait...
                    </p>
                    <img src={logo} className="App-logo" alt="logo" />
                 </div>
            );
        }
        if (error){
            return (
                <div className='message'> 
                    Sorry, we have an Error, look at the console for details
                </div>
            );
        }
        if(books){
            return books.map(el => {
                return (
                    <div key={el.id}>
                        <Item book={el} />
                    </div>
                );
            });
        } else {
            return (
                <div className='message'>
                    No books found for: {`'${searchTerm}'`}
                </div>
            );
        }
    }

    return (
        <div className="App">
            <img className='books-logo' src={BooksLogo} alt=''></img>
            <form onSubmit={handleSearch}>
                <input 
                    value={searchTerm}
                    className='input'
                    type='text'
                    onChange={handleInput}>
                </input>
                <button 
                    type="submit"
                    className='button'>
                    Search
                </button>
            </form>
            <div className='list'>
                {handelRender()}
            </div>
        </div>
    );
    
}

export default BookSearch;
