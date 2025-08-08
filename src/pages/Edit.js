import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import { useNavigate, useParams } from 'react-router-dom';
import { BookDispatchContext, BookStateContext } from '../App';

const Edit = () => {
    const { id } = useParams();
    const books = useContext(BookStateContext);
    const dispatch = useContext(BookDispatchContext);
    const navigate = useNavigate();

    const book = books.find((it) => String(it.id) === id);

    const handleUpdate = (data) => {
        dispatch({ type: 'UPDATE' , data });
        navigate('/gallery');
    };

    if(!book) return <p>존재하지 않는 서적입니다.</p>

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ 
                    fontSize: '2em', 
                    color: '#333', 
                    marginBottom: '10px'
                }}>
                    ✏️ 독후감 수정
                </h2>
                <p style={{ color: '#666', fontSize: '1.1em' }}>
                    독후감을 수정하고 업데이트하세요
                </p>
            </div>
            <ReviewForm initialValues={book} onSubmit={handleUpdate} />
        </div>
    );
}

export default Edit;