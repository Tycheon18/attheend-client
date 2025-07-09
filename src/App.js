import React, { useReducer } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BookSearch from './components/BookSearch/BookSearch';
import BookList from './components/BookList/BookList';

export const BookStateContext = React.createContext();
export const BookDispatchContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE': {
      const newState = [action.data, ...state];

      return newState;
    }
    case 'UPDATE': {
      const newState = state.map((book) => 
        book.id === action.data.id ? { ...action.data } : book
      );

      return newState;
    }
    case 'DELETE': {
      const newState = state.filter((book) => book.id !== action.target.id );

      return newState;
    }
  }
}

function App() {
  const [book, dispatch] = useReducer(reducer, []);

  return (
    <Layout>
      <BookSearch />
      <BookList />
    </Layout>
  );
}

export default App;
