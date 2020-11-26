import React from 'react';
import './styles/Styles.css';
import noThumbnail from './styles/noThumbnail.png';

interface Props {
    book: {
        volumeInfo:{
            categories: string | null,
            description: string | null,
            imageLinks: {
                thumbnail: string | null
            },
            authors: string[] | null,
            infoLink: string | null,
            title: string | null
        }
    }
}

const Item: React.FC<Props> = ({book}) => {
    let categories = book.volumeInfo.categories ? book.volumeInfo.categories : 'no categories found';
    let description = book.volumeInfo.description ? book.volumeInfo.description : 'Sorry, no description was found...';
    let thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : noThumbnail;
    let authors = book.volumeInfo.authors ? book.volumeInfo.authors : null;
    
    return (
        <div className='card'>
            <p className='title'>
                <a target='_blank' href={book.volumeInfo.infoLink} rel="noopener noreferrer">
                    {book.volumeInfo.title}
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