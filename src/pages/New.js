import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import { BookDispatchContext } from '../App';
import { useNavigate } from 'react-router-dom';

const New = () => {
    const dispatch = useContext(BookDispatchContext);
    const navigate = useNavigate();

    const handleCreate = (data) => {
        dispatch({type: 'CREATE' , data});
        // 임시 데이터 삭제
        sessionStorage.removeItem('tempBookData');
        navigate('/gallery');
    }

    // 세션 스토리지에서 임시 책 데이터 확인
    const getInitialData = () => {
        const tempData = sessionStorage.getItem('tempBookData');
        if (tempData) {
            try {
                return JSON.parse(tempData);
            } catch (error) {
                console.error('임시 데이터 파싱 오류:', error);
                return null;
            }
        }
        return null;
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ 
                    fontSize: '2em', 
                    color: '#333', 
                    marginBottom: '10px'
                }}>
                    ✍️ 독후감 작성
                </h2>
                <p style={{ color: '#666', fontSize: '1.1em' }}>
                    읽은 책에 대한 독후감을 작성해보세요
                </p>
            </div>
            <ReviewForm onSubmit={handleCreate} initialValues={getInitialData()} />
        </div>
    )
}

export default New;