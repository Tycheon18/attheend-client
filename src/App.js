import React, { useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import LandingPage from './pages/LandingPage';
import Search from './pages/Search';
import New from './pages/New';
import Edit from './pages/Edit';
import Gallery from './pages/Gallery';
import LoadingSpinner from './components/Common/LoadingSpinner';
import { ToastProvider } from './components/Common/Toast';
import { ThemeProvider } from './contexts/ThemeContext';

export const BookStateContext = React.createContext();
export const BookDispatchContext = React.createContext();
export const BookIdContext = React.createContext();

const STORAGE_KEY = 'attheend-books';

// localStorage 유틸리티 함수들
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('데이터 로딩 오류:', error);
    return [];
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('데이터 저장 오류:', error);
  }
};

function reducer(state, action) {
  let newState;
  
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE': {
      newState = [action.data, ...state];
      saveToStorage(newState);
      return newState;
    }
    case 'UPDATE': {
      newState = state.map((book) => 
        book.id === action.data.id ? { ...action.data } : book
      );
      saveToStorage(newState);
      return newState;
    }
    case 'DELETE': {
      newState = state.filter((book) => book.id !== action.target.id );
      saveToStorage(newState);
      return newState;
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [books, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    // localStorage에서 저장된 독후감 데이터 로드
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      idRef.current = 1; // 첫 번째 ID는 1부터 시작
      setIsDataLoaded(true);
      return;
    }

    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      idRef.current = 1; // 첫 번째 ID는 1부터 시작
      setIsDataLoaded(true);
      return;
    }

    // ID 기준으로 정렬하고 다음 ID 설정
    localData.sort((a, b) => Number(b.id) - Number(a.id));
    idRef.current = Number(localData[0].id) + 1;

    dispatch({ type: 'INIT', data: localData });
    setIsDataLoaded(true);
  }, [])

  if (!isDataLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <LoadingSpinner size="large" text="독후감 데이터를 불러오는 중입니다..." />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <BookStateContext.Provider value={books}>
          <BookDispatchContext.Provider value={dispatch}>
            <BookIdContext.Provider value={idRef}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/search" element={<Layout><Search /></Layout>} />
                  <Route path="/new" element={<Layout><New /></Layout>} />
                  <Route path="/edit/:id" element={<Layout><Edit /></Layout>} />
                  <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
                </Routes>
              </BrowserRouter>
            </BookIdContext.Provider>
          </BookDispatchContext.Provider>
        </BookStateContext.Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
