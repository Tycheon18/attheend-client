import React, { useContext, useState, useMemo } from 'react';
import Layout from '../components/Layout/Layout';
import ReviewList from '../components/ReviewList/ReviewList';
import { BookStateContext } from '../App';
import styles from './Gallery.module.css';

const Gallery = () => {
    const books = useContext(BookStateContext);
    const [filter, setFilter] = useState('all'); // all, rating, date
    const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest, rating

    // 통계 계산
    const stats = useMemo(() => {
        if (!books || books.length === 0) return null;
        
        const totalBooks = books.length;
        const totalRating = books.reduce((sum, book) => sum + (book.rating || 0), 0);
        const averageRating = totalRating / totalBooks;
        const fiveStarBooks = books.filter(book => book.rating === 5).length;
        const recentBooks = books.filter(book => {
            const bookDate = new Date(book.readingDate || book.createdAt);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return bookDate > thirtyDaysAgo;
        }).length;

        return {
            totalBooks,
            averageRating: averageRating.toFixed(1),
            fiveStarBooks,
            recentBooks
        };
    }, [books]);

    // 필터링 및 정렬된 책 목록
    const filteredAndSortedBooks = useMemo(() => {
        if (!books) return [];
        
        let filtered = [...books];
        
        // 필터링
        if (filter === 'rating') {
            filtered = filtered.filter(book => book.rating >= 4);
        }
        
        // 정렬
        switch (sortOrder) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                break;
        }
        
        return filtered;
    }, [books, filter, sortOrder]);

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.galleryHeader}>
                <h2 className={styles.galleryTitle}>
                    📚 내 갤러리
                </h2>
                <p className={styles.galleryDescription}>
                    작성한 독후감들을 관리하고 확인하세요
                </p>
            </div>

            {/* 데이터가 있을 때만 통계 카드와 필터 표시 */}
            {books && books.length > 0 ? (
                <>
                    {/* 통계 카드 */}
                    {stats && (
                        <div className={styles.statsGrid}>
                            <div style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2em', marginBottom: '5px' }}>📖</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{stats.totalBooks}</div>
                                <div style={{ fontSize: '0.9em' }}>총 독후감</div>
                            </div>
                            
                            <div style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2em', marginBottom: '5px' }}>⭐</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{stats.averageRating}</div>
                                <div style={{ fontSize: '0.9em' }}>평균 평점</div>
                            </div>
                            
                            <div style={{
                                backgroundColor: '#ffc107',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2em', marginBottom: '5px' }}>🌟</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{stats.fiveStarBooks}</div>
                                <div style={{ fontSize: '0.9em' }}>5점 도서</div>
                            </div>
                            
                            <div style={{
                                backgroundColor: '#17a2b8',
                                color: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '2em', marginBottom: '5px' }}>📅</div>
                                <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{stats.recentBooks}</div>
                                <div style={{ fontSize: '0.9em' }}>최근 30일</div>
                            </div>
                        </div>
                    )}

                    {/* 필터 및 정렬 옵션 */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                    }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#495057' }}>
                                필터:
                            </label>
                            <select 
                                value={filter} 
                                onChange={(e) => setFilter(e.target.value)}
                                style={{
                                    padding: '5px 10px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="all">전체</option>
                                <option value="rating">4점 이상</option>
                            </select>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#495057' }}>
                                정렬:
                            </label>
                            <select 
                                value={sortOrder} 
                                onChange={(e) => setSortOrder(e.target.value)}
                                style={{
                                    padding: '5px 10px',
                                    border: '1px solid #ced4da',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="newest">최신순</option>
                                <option value="oldest">오래된순</option>
                                <option value="rating">평점순</option>
                            </select>
                        </div>
                    </div>

                    {/* 독후감 목록 */}
                    <ReviewList books={filteredAndSortedBooks} />
                </>
            ) : (
                /* 데이터가 없을 때는 ReviewList의 빈 상태 UI만 표시 */
                <ReviewList />
            )}
        </div>
    );
}

export default Gallery;


