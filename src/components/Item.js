import React from 'react';
import './styles/Styles.css';
import noThumbnail from './styles/noThumbnail.png';

const Item = (props) => {
    let categories = props.book.volumeInfo.categories ? props.book.volumeInfo.categories : 'no categories found';
    let description = props.book.volumeInfo.description ? props.book.volumeInfo.description : 'Sorry, no description was found...';
    let thumbnail = props.book.volumeInfo.imageLinks ? props.book.volumeInfo.imageLinks.thumbnail : noThumbnail;
    let authors = props.book.volumeInfo.authors ? props.book.volumeInfo.authors : null;
    
    return (
        <div className='card'>
            <p className='title'>
                <a target='_blank' href={props.book.volumeInfo.infoLink} rel="noopener noreferrer">
                    {props.book.volumeInfo.title}
                </a>
            </p>
            <p>
                <strong>Authors: </strong>
                {authors ? 
                    authors.map(el => {
                        return (el + ', ');
                    }) 
                    : 'no autors found'
                }
            </p>
            <img className='thumbnail' src={thumbnail} alt=''></img>
            <div className='description'>
                <p>
                    {description}
                </p>
            </div>
            <div className='categories'>
                <p>
                    <em>{categories}</em>
                </p>
            </div>
        </div>
    );
}

export default Item;