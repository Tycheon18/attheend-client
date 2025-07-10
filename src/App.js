import React, { useEffect, useReducer } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BookSearch from './components/Search/BookSearch';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

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
    default: {
      return state;
    }
  }
}

function App() {
  const [books, dispatch] = useReducer(reducer, []);

  useEffect(() => {

    dispatch({ type: 'INIT', data: [] });
  })

  return (
    <BookStateContext.Provider value={books}>
      <BookDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Main /></Layout>} />
          </Routes>
        </BrowserRouter>
      </BookDispatchContext.Provider>
    </BookStateContext.Provider>
  );
}

export default App;
