import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookDispatchContext } from '../../App';

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
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
        onClick={handleEdit}
        >
            {/* 책 표지 이미지 */}
            {book.coverImage && (
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <img 
                        src={book.coverImage} 
                        alt={`${book.title} 표지`}
                        style={{
                            maxWidth: '120px',
                            maxHeight: '160px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            {/* 책 제목 */}
            <h4 style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333',
                lineHeight: '1.3'
            }}>
                {book.title}
            </h4>

            {/* 저자 */}
            {book.authors && book.authors.length > 0 && (
                <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    color: '#666',
                    fontStyle: 'italic'
                }}>
                    저자: {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
                </p>
            )}

            {/* 평점 */}
            <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '16px' }}>
                    {'⭐'.repeat(book.rating || 0)}
                </span>
                <span style={{ 
                    marginLeft: '5px', 
                    fontSize: '14px', 
                    color: '#666' 
                }}>
                    ({book.rating || 0}점)
                </span>
            </div>

            {/* 독후감 내용 미리보기 */}
            <p style={{
                margin: '8px 0',
                fontSize: '14px',
                color: '#555',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {book.content}
            </p>

            {/* 읽은 날짜 */}
            {book.readingDate && (
                <p style={{
                    margin: '8px 0',
                    fontSize: '12px',
                    color: '#999'
                }}>
                    읽은 날짜: {formatDate(book.readingDate)}
                </p>
            )}

            {/* 작성/수정 날짜 */}
            <p style={{
                margin: '8px 0 0 0',
                fontSize: '12px',
                color: '#999'
            }}>
                {book.updatedAt ? `수정: ${formatDate(book.updatedAt)}` : `작성: ${formatDate(book.createdAt)}`}
            </p>

            {/* 액션 버튼들 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '15px',
                gap: '10px'
            }}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    ✏️ 수정
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    🗑️ 삭제
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;
