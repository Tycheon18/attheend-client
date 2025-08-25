import React, { useContext } from 'react';
import { BookStateContext } from '../../App';
import ReviewItem from './ReviewItem';
import styles from './ReviewList.module.css';

const ReviewList = ({ books: externalBooks }) => {
    const contextBooks = useContext(BookStateContext);
    const books = externalBooks || contextBooks;

    if (!books || books.length === 0) {
        return (
            <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                {/* 빈 상태 아이콘 */}
                <div style={{
                    fontSize: '80px',
                    marginBottom: '20px',
                    opacity: 0.6
                }}>
                    📚
                </div>
                
                <h3 style={{
                    fontSize: '1.8em',
                    marginBottom: '15px',
                    color: '#333',
                    fontWeight: 'normal'
                }}>
                    아직 작성된 독후감이 없습니다
                </h3>
                
                <p style={{
                    fontSize: '1.1em',
                    marginBottom: '30px',
                    color: '#666',
                    lineHeight: '1.5'
                }}>
                    첫 번째 독후감을 작성하고 나만의 독서 기록을 시작해보세요!<br/>
                    읽은 책에 대한 생각과 감상을 자유롭게 기록할 수 있습니다.
                </p>
                
                {/* 액션 버튼들 */}
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button 
                        onClick={() => window.location.href = '/new'}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 4px rgba(0,123,255,0.3)'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#0056b3';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0,123,255,0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0,123,255,0.3)';
                        }}
                    >
                        ✍️ 독후감 작성하기
                    </button>
                    
                    <button 
                        onClick={() => window.location.href = '/search'}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#545b62';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#6c757d';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        🔍 책 검색하기
                    </button>
                </div>
                
                {/* 도움말 */}
                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    <h4 style={{
                        margin: '0 0 10px 0',
                        color: '#495057',
                        fontSize: '1.1em'
                    }}>
                        💡 독후감 작성 팁
                    </h4>
                    <ul style={{
                        textAlign: 'left',
                        margin: '0',
                        paddingLeft: '20px',
                        color: '#6c757d',
                        lineHeight: '1.6'
                    }}>
                        <li>책을 읽고 난 후의 감상과 생각을 자유롭게 기록하세요</li>
                        <li>인상 깊었던 구절이나 문장을 함께 남겨보세요</li>
                        <li>책을 통해 얻은 인사이트나 깨달음을 정리해보세요</li>
                        <li>나중에 다시 읽을 때를 위해 평점도 매겨보세요</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <h3>📚 내 독후감 목록 ({books.length}개)</h3>
                <button 
                    onClick={() => window.location.href = '/new'}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    ✍️ 새 독후감 작성
                </button>
            </div>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
            }}>
                {books.map((book) => (
                    <ReviewItem key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default ReviewList;