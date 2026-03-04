import React, { useContext } from 'react';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import { useNavigate, useParams } from 'react-router-dom';
import { BookDispatchContext, BookStateContext } from '../App';
import { Pencil, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const books = useContext(BookStateContext);
    const dispatch = useContext(BookDispatchContext);
    const navigate = useNavigate();

    const book = books.find((it) => String(it.id) === id);

    const handleUpdate = (data) => {
        dispatch({ type: 'UPDATE', data });
        navigate('/gallery');
    };

    // 404 상태
    if (!book) return (
        <div className="max-w-[720px] mx-auto px-6 py-20 flex flex-col items-center text-center">
            <AlertTriangle className="w-12 h-12 text-cover-400 mb-4" />
            <h2 className="font-serif text-2xl text-charcoal-700 mb-2">존재하지 않는 독후감입니다</h2>
            <p className="text-sm text-charcoal-500 mb-6">이미 삭제되었거나 잘못된 경로입니다.</p>
            <Link to="/gallery" className="btn-ink text-sm">갤러리로 돌아가기</Link>
        </div>
    );

    return (
        <div className="max-w-[720px] mx-auto px-6 pt-8 pb-16">
            <div className="flex items-center gap-2 mb-1">
                <Pencil className="w-4 h-4 text-ink-500" />
                <p className="eyebrow">독후감 수정</p>
            </div>
            <h1 className="section-heading text-2xl mb-1">독후감 수정</h1>
            <p className="text-sm text-charcoal-500 mb-7">
                <span className="font-medium text-charcoal-700">"{book.title}"</span>에 대한 독후감을 수정합니다
            </p>
            <ReviewForm initialValues={book} onSubmit={handleUpdate} />
        </div>
    );
};

export default Edit;
