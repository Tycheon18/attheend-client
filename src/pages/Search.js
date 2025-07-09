import React from 'react';
import Layout from '../components/Layout/Layout';
import BookSearch from '../components/BookSearch/BookSearch';
import BookList from '../components/BookList/BookList';

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