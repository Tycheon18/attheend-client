import { useEffect, useState } from "react";
import styles from "./BookList.module.css";
import BookListItem from "./BookListItem";

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

    if (loading) return <p>검색 중...</p>;
    if (error) return <p style={{ color: 'red' }}>검색 중 오류가 발생했습니다: {error}</p>;
    if (!data.length) return <p>검색 결과가 없습니다.</p>;

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