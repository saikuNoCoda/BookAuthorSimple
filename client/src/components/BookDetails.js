import React from 'react';
import {getBookQuery} from '../queries/queries';
import {gql,useQuery, useMutation,refetchQueries} from '@apollo/client';

const BookDetails = ({id}) => {

    const {loading,error,data} = useQuery(getBookQuery,{
        variables: {id}
    });

    const displayBook = () => {
        if(data && data.book) {
            const book = data.book;
            return (
                <div>
                    <h2>Name: {book.name}</h2>
                    <p>Genre: {book.genre}</p>
                    <p>Author: {book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            );
        }else {
            return (<div>No book selected...</div>)
        }
    }
    
    return (
        <div id="book-details">
            <p>Output book details....</p>
            {
                displayBook()
            }
        </div>
    );
};

export default BookDetails;