import React, {useState} from 'react';

import {gql,useQuery} from '@apollo/client';
import {getBooksQuery} from "../queries/queries";
import BookDetails from './BookDetails';

function BookList() {

    const {loading,error,data} = useQuery(getBooksQuery);
    const [idR, setidR] = useState();
 
    const displayBooks = () => {
        if(loading) {
            return (<div>Loading Books....</div>);
        }else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={(e) => {
                        setidR(book.id)
                    }}>{book.name}</li>
                )
            });
        }
    };

    return (
        <div>
            <ul id="book-list">
                {
                    displayBooks()
                }
            </ul>
            <BookDetails id={idR}/>
        </div>
    );
}

export default BookList;
