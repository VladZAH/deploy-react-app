import React from 'react';
import './styles/Styles.css';
import noThumbnail from './styles/noThumbnail.png';

interface Props {
    book: {
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

const Item: React.FC<Props> = ({book}) => {
    let categories = book.categories ? book.categories : 'no categories found';
    let description = book.description ? book.description : 'Sorry, no description was found...';
    let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : noThumbnail;
    let authors = book.authors ? book.authors : null;
    
    return (
        <div className='card'>
            <p className='title'>
                <a target='_blank' href={book.infoLink} rel="noopener noreferrer">
                    {book.title}
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