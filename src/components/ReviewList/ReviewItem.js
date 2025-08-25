import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookDispatchContext } from '../../App';
import styles from './ReviewItem.module.css';

const ReviewItem = ({ book }) => {
    const navigate = useNavigate();
    const dispatch = useContext(BookDispatchContext);

    const handleEdit = () => {
        navigate(`/edit/${book.id}`);
    };

    const handleDelete = () => {
        if (window.confirm('정말로 이 독후감을 삭제하시겠습니까?')) {
            dispatch({ type: 'DELETE', target: book });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.reviewItem} onClick={handleEdit}>
            {/* 책 표지 이미지 */}
            {book.coverImage && (
                <div className={styles.coverImage}>
                    <img 
                        src={book.coverImage} 
                        alt={`${book.title} 표지`}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            {/* 책 제목 */}
            <h4 className={styles.title}>
                {book.title}
            </h4>

            {/* 저자 */}
            {book.authors && book.authors.length > 0 && (
                <p className={styles.authors}>
                    저자: {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
                </p>
            )}

            {/* 평점 */}
            <div className={styles.rating}>
                <span className={styles.ratingStars}>
                    {'⭐'.repeat(book.rating || 0)}
                </span>
                <span className={styles.ratingText}>
                    ({book.rating || 0}점)
                </span>
            </div>

            {/* 독후감 내용 미리보기 */}
            <p className={styles.content}>
                {book.content}
            </p>

            {/* 읽은 날짜 */}
            {book.readingDate && (
                <p className={styles.readingDate}>
                    읽은 날짜: {formatDate(book.readingDate)}
                </p>
            )}

            {/* 작성/수정 날짜 */}
            <p className={styles.createdDate}>
                {book.updatedAt ? `수정: ${formatDate(book.updatedAt)}` : `작성: ${formatDate(book.createdAt)}`}
            </p>

            {/* 액션 버튼들 */}
            <div className={styles.actionButtons}>
                <button
                    className={styles.editButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                >
                    ✏️ 수정
                </button>
                <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    🗑️ 삭제
                </button>
            </div>
        </div>
    );
};

export default React.memo(ReviewItem);
