import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout.js';
import BookSearch from './components/BookSearch/BookSearch.js';
import BookList from './components/BookList/BookList.js';

function App() {
  return (
    <Layout>
      <BookSearch />
      <BookList />
    </Layout>
  );
}

export default App;
