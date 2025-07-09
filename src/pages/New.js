import React, { useContext } from 'react';
import Layout from '../components/Layout/Layout';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import { BookDispatchContext } from '../App';
import { useNavigate } from 'react-router-dom';

const New = () => {
    const dispatch = useContext(BookDispatchContext);
    const navigate = useNavigate();

    const handleCreate = (data) => {
        dispatch({type: 'CREATE' , data});
        navigate('/gallary');
    }

    return (
        <div>
            <h2>독후감 작성</h2>
            <ReviewForm onSubmit ={handleCreate} />
        </div>
    )
}

export default New;