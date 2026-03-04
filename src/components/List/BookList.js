import { useEffect, useState } from 'react';
import BookListItem from './BookListItem';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { Search } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const BookList = ({ data = [], loading, error }) => {
    const [page, setPage] = useState(1);

    useEffect(() => { setPage(1); }, [data]);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const pagedData = data.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="w-12 h-12 text-linen-300 mb-4" />
            <h3 className="font-serif text-xl text-charcoal-700 mb-2">검색 결과가 없습니다</h3>
            <p className="text-sm text-charcoal-500">다른 키워드나 검색 조건으로 다시 시도해보세요</p>
        </div>
    );

    return (
        <div>
            {/* 결과 목록 */}
            <div className="flex flex-col gap-3">
                {pagedData.map((book) => (
                    <BookListItem key={book.isbn} book={book} />
                ))}
            </div>

            {/* 내부 페이지네이션 (10개 초과 시) */}
            {data.length > ITEMS_PER_PAGE && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-sm rounded border border-linen-300 text-charcoal-700 hover:bg-linen-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        이전
                    </button>
                    <span className="text-sm text-charcoal-600">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-sm rounded border border-linen-300 text-charcoal-700 hover:bg-linen-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookList;
