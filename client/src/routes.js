import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Books from './pages/books/index';
import NewBook from './pages/newBook/index';

export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/books' element={<Books/>}/>
                <Route path='/books/new/:bookId' element={<NewBook/>}/>
            </Routes>
        </BrowserRouter>
    );
};