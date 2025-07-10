import React from 'react';
import Layout from '../components/Layout/Layout';
import BookList from '../components/List/BookList';

const Search = () => {
    return (
        <div>
            <h2>서적 검색</h2>
            <BookSearch />
            <BookList />
        </div>
    );
}

export default Search;