import React, { useEffect, useReducer } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';
import New from './pages/New';
import Edit from './pages/Edit';
import Gallary from './pages/Gallary';

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
  }, [])

  return (
    <BookStateContext.Provider value={books}>
      <BookDispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Main /></Layout>} />
            <Route path="/search" element={<Layout><Search /></Layout>} />
            <Route path="/new" element={<Layout><New /></Layout>} />
            <Route path="/edit/:id" element={<Layout><Edit /></Layout>} />
            <Route path="/gallary" element={<Layout><Gallary /></Layout>} />
          </Routes>
        </BrowserRouter>
      </BookDispatchContext.Provider>
    </BookStateContext.Provider>
  );
}

export default App;
