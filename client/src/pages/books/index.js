import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'
import logImage from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi'
import { FiEdit } from 'react-icons/fi'
import { FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

export default function Books(){

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    const userName = localStorage.getItem('userName');

    const accessToken = localStorage.getItem('accessToken');

    const authorization = {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/api/Book/v1/asc/4/${page}`, authorization).then(response => {
            setBooks(response.data.list)
        })
    }, [accessToken])

    async function fetchMorBooks(){
        const response = await api.get(`/api/Book/v1/asc/4/${page}`, authorization)
        setBooks([ ...books, ...response.data.list]);
        setPage(page + 1);
    }

    async function editBook(id){
        try {
            navigate(`/books/new/${id}`)
        } catch (err) {
            alert('Edit book failed, Try again!')
        }
    }

    async function deleteBook(id){
        try {
            api.delete(`/api/Book/v1/${id}`, authorization)
            
            setBooks(books.filter(book => book.id !== id))
        } catch (err) {
            alert('Delete failed, Try again!')
        }
    }

    async function logout(){
        try {
            api.get(`/api/Auth/v1/revoke`, authorization)
            
            localStorage.clear();
            navigate('/');
        } catch (err) {
            alert('Logout failed, Try again!')
        }
    }

    return (
        <div className="book-container">
            <header>
                <img src={logImage} alt="Erudio"/>
                <span>Welcome, <strong>{userName.toUpperCase()}</strong></span>
                <Link className="button" to="/books/new/0">Add new Book</Link>
                <button type='button' onClick={logout}>
                    <FiPower size={18} color="#251fc5"/>
                </button>
            </header>

            <h1>
                Registered Books
            </h1>
            <ul>
                {
                    books.map(book => (
                        <li key={book.id}>
                            <strong>
                                Title:
                            </strong>
                            <p>{book.title}</p>
                            <strong>
                                Author:
                            </strong>
                            <p>{book.author}</p>
                            <strong>
                                Price:
                            </strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRl'}).format(book.price)}</p>
                            <strong>
                                Release Date:
                            </strong>
                            <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>

                            <button type='button'>
                                <FiEdit size={20} color="#251fc5" onClick={() => editBook(book.id)}/>
                            </button>

                            <button type='button' onClick={() => deleteBook(book.id)}>
                                <FiTrash2 size={20} color="#251fc5"/>
                            </button>
                        </li>
                    ))
                }
            </ul>

            <button className="button" type='button' onClick={fetchMorBooks}>
                Load More
            </button>
        </div>
    )
}