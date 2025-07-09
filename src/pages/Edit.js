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
        navigate('/gallary');
    };

    if(!book) return <p>존재하지 않는 서적입니다.</p>

    return (
        <div>
            <h2>독후감 수정</h2>
            <ReviewForm initialValues={book} onSubmit={handleUpdate} />
        </div>
    );
}

export default Edit;