import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
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
    const [originalResults, setOriginalResults] = useState([]); // API 원본 결과 저장
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');

    const query = searchParams.get('query');
    const target = searchParams.get('target') || 'all';

    // URL 파라미터나 page가 변경될 때마다 검색 실행
    useEffect(() => {
        if (query) {
            performSearch();
        }
    }, [query, target, page]);

    const performSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ query, page, size: ITEMS_PER_PAGE });
            if (target !== "all") params.append("target", target);

            const res = await fetch(
                `https://dapi.kakao.com/v3/search/book?${params.toString()}`,
                {
                    headers: {
                        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
                    },
                }
            );

            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const data = await res.json();
            setOriginalResults(data.documents);
            setResults(sortBookResults(data.documents, sortBy));
            setTotalCount(data.meta?.total_count || 0);
            
            // 검색어를 최근 검색어에 추가 (페이지 1일 때만)
            if (page === 1 && query) {
                addRecentSearch(query, target);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 새로운 검색을 위한 함수 (SearchBar에서 사용)
    const handleNewSearch = async ({ category, query }) => {
        if (!query?.trim()) return;
        // 검색 시 page를 1로 초기화하고 정렬을 관련도순으로 리셋
        setPage(1);
        setSortBy('relevance');
        // URL을 업데이트하여 검색 실행
        const params = new URLSearchParams({ query });
        if (category !== "all") params.append("target", category);
        window.history.pushState({}, '', `/search?${params.toString()}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };
    
    // 정렬 변경 핸들러
    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
        // 현재 결과를 새로운 기준으로 정렬
        setResults(sortBookResults(originalResults, newSortBy));
    };
    
    // 최근 검색어에서 검색 선택 핸들러
    const handleRecentSearchSelect = ({ category, query }) => {
        handleNewSearch({ category, query });
    };

    const getSearchCategoryLabel = (target) => {
        const categories = {
            'all': '전체',
            'title': '책 제목',
            'authors': '저자',
            'publisher': '출판사'
        };
        return categories[target] || '전체';
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    
    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ 
                    fontSize: '2em', 
                    color: '#333', 
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    📚 서적 검색
                </h2>
                
                {/* 검색바 */}
                <SearchBar onSearch={handleNewSearch} />
                
                {/* 최근 검색어 */}
                <RecentSearches 
                    onSearchSelect={handleRecentSearchSelect}
                    show={true}
                />
                
                {/* 검색 조건 표시 */}
                {query && (
                    <div style={{ 
                        marginTop: '20px',
                        padding: '15px', 
                        backgroundColor: '#f8f9fa', 
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <strong style={{ color: '#495057' }}>검색 조건:</strong> 
                                <span style={{ color: '#007bff', fontWeight: 'bold' }}>
                                    {getSearchCategoryLabel(target)} - "{query}"
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* 정렬 옵션 */}
                {query && !loading && !error && (
                    <SortOptions
                        sortBy={sortBy}
                        onSortChange={handleSortChange}
                        resultsCount={totalCount}
                    />
                )}
            </div>
            
            {/* 검색 결과 */}
            <div style={{ marginTop: '20px' }}>
                <BookList data={results} loading={loading} error={error} />
            </div>
            
            {/* 페이지네이션 */}
            {!loading && !error && totalCount > 0 && (
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        totalCount={totalCount}
                        onPageChange={handlePageChange}
                        itemsPerPage={ITEMS_PER_PAGE}
                    />
                </div>
            )}
        </div>
    );
}

export default Search;