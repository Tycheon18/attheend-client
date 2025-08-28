import { useEffect, useState } from "react";
import styles from "./BookList.module.css";
import BookListItem from "./BookListItem";
import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorMessage from "../Common/ErrorMessage";

const ITEMS_PER_PAGE = 10;

const BookList = ({ data, loading, error }) => {
    const [page, setPage] = useState(1);

    // 데이터가 변경될 때 페이지를 1로 초기화
    useEffect(() => {
        setPage(1);
    }, [data]);

    useEffect(() => {
        console.log("📚 BookList에 전달된 data:", data);
    }, [data]);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIdx = (page - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const pagedData = data.slice(startIdx, endIdx);

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <LoadingSpinner size="large" text="책을 검색하고 있습니다..." />
        </div>
    );
    if (error) return (
        <ErrorMessage 
            title="검색 중 오류가 발생했습니다"
            message={`문제 상황: ${error}`}
            onRetry={() => window.location.reload()}
            retryText="페이지 새로고침"
        />
    );
    
    if (!data.length) return (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ marginBottom: '8px', color: '#333' }}>검색 결과가 없습니다</h3>
            <p>다른 키워드로 검색해보세요</p>
        </div>
    );

    return (
        <div>
            {/* 검색 결과 목록 */}
            {pagedData.map((book) => (
                <BookListItem key={book.isbn} book={book} />
            ))}

            {/* 페이지네이션 */}
            {data.length > ITEMS_PER_PAGE && (
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <button onClick={handlePrev} disabled={page === 1}>이전</button>
                    <span style={{ margin: '0 12px' }}>{page} / {totalPages}</span>
                    <button onClick={handleNext} disabled={page === totalPages}>다음</button>
                </div>
            )}
        </div>
    );
}

export default BookList;