import React, {useState} from 'react';

import {gql,useQuery, useMutation,refetchQueries} from '@apollo/client';

import {getAuthorsQuery,addBookMutation} from "../queries/queries";
import {getBooksQuery} from "../queries/queries";


function AddBook() {

    const {loading,error,data} = useQuery(getAuthorsQuery);
    const [formData, setformData] = useState({
        name: "",
        genre: "",
        authorId: ""
    });
    const [addData] = useMutation(addBookMutation,{
        refetchQueries: [{query: getBooksQuery}]});

    const displayAuthors = () => {
        if(loading) {
            return (<option disabled>Loading Authors...</option>);
        }else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            });
        }
    };

    const formSubmit = (e) => {
        e.preventDefault();
        addData({
            variables: {
                ...formData
            }
        });
        setformData({
            name: "",
            genre: "",
            authorId: ""
        });
    }

    return (
        <form id="add-book" onSubmit={formSubmit}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={(e)=>setformData({
                    ...formData,
                    name: e.target.value
                })} value={formData.name}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e)=>setformData({
                    ...formData,
                    genre: e.target.value
                })} value={formData.genre}/>
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setformData({
                    ...formData,
                    authorId: e.target.value
                })} value={formData.authorId}>
                    <option>Select Author</option>
                    {
                        displayAuthors()
                    }
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default AddBook;
