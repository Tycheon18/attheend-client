import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookList from '../components/List/BookList';
import SearchBar from '../components/Search/SearchBar';
import SortOptions from '../components/Search/SortOptions';
import RecentSearches from '../components/Search/RecentSearches';
import Pagination from '../components/Pagination/Pagination';
import { sortBookResults } from '../utils/sortUtils';
import { addRecentSearch } from '../utils/recentSearchUtils';

const ITEMS_PER_PAGE = 10;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [originalResults, setOriginalResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');

    const query = searchParams.get('query');
    const target = searchParams.get('target') || 'all';

    useEffect(() => {
        if (query) performSearch();
    }, [query, target, page]);

    const performSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({ query, page, size: ITEMS_PER_PAGE });
            if (target !== 'all') params.append('target', target);
            const res = await fetch(
                `https://dapi.kakao.com/v3/search/book?${params.toString()}`,
                { headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}` } }
            );
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const data = await res.json();
            setOriginalResults(data.documents);
            setResults(sortBookResults(data.documents, sortBy));
            setTotalCount(data.meta?.total_count || 0);
            if (page === 1 && query) addRecentSearch(query, target);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNewSearch = ({ category, query }) => {
        if (!query?.trim()) return;
        setPage(1);
        setSortBy('relevance');
        const params = new URLSearchParams({ query });
        if (category !== 'all') params.append('target', category);
        window.history.pushState({}, '', `/search?${params.toString()}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
        setResults(sortBookResults(originalResults, newSortBy));
    };

    const getTargetLabel = (t) =>
        ({ all: '전체', title: '책 제목', authors: '저자', publisher: '출판사' }[t] || '전체');

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <div className="max-w-[1100px] mx-auto px-6 py-10">

            {/* ── 페이지 헤더 ── */}
            <div className="mb-5">
                <p className="eyebrow mb-1">도서 검색</p>
                <h1 className="section-heading text-2xl">원하는 책을 찾아보세요</h1>
            </div>

            {/* ── 검색바 ── */}
            <div className="mb-4">
                <SearchBar onSearch={handleNewSearch} />
            </div>

            {/* ── 최근 검색어 ── */}
            <RecentSearches onSearchSelect={handleNewSearch} show={true} />

            {/* ── 검색 조건 표시 ── */}
            {query && (
                <div className="mt-5 mb-2 flex items-center gap-2 text-sm text-charcoal-700">
                    <span className="text-charcoal-500">검색 조건</span>
                    <span className="text-ink-500 font-semibold">
                        {getTargetLabel(target)} — "{query}"
                    </span>
                    {!loading && totalCount > 0 && (
                        <span className="ml-auto text-charcoal-500 text-xs">
                            {totalCount.toLocaleString()}개 결과
                        </span>
                    )}
                </div>
            )}

            {/* ── 정렬 옵션 ── */}
            {query && !loading && !error && (
                <SortOptions sortBy={sortBy} onSortChange={handleSortChange} resultsCount={totalCount} />
            )}

            {/* ── 검색 결과 ── */}
            <div className="mt-4">
                <BookList data={results} loading={loading} error={error} />
            </div>

            {/* ── 페이지네이션 ── */}
            {!loading && !error && totalCount > 0 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        totalCount={totalCount}
                        onPageChange={setPage}
                        itemsPerPage={ITEMS_PER_PAGE}
                    />
                </div>
            )}
        </div>
    );
};

export default Search;
