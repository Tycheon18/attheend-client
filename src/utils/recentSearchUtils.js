// 최근 검색어 관리 유틸리티

const RECENT_SEARCHES_KEY = 'attheend_recent_searches';
const MAX_RECENT_SEARCHES = 10; // 최대 10개의 최근 검색어 저장

export const getRecentSearches = () => {
    try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load recent searches:', error);
        return [];
    }
};

export const addRecentSearch = (searchTerm, category = 'all') => {
    try {
        const recentSearches = getRecentSearches();
        const newSearch = {
            query: searchTerm.trim(),
            category,
            timestamp: new Date().toISOString(),
            displayText: `${getCategoryDisplayName(category)} - "${searchTerm.trim()}"`
        };

        // 중복 제거 (같은 쿼리와 카테고리)
        const filteredSearches = recentSearches.filter(
            search => !(search.query === newSearch.query && search.category === newSearch.category)
        );

        // 새 검색어를 맨 앞에 추가
        const updatedSearches = [newSearch, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);

        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
        return updatedSearches;
    } catch (error) {
        console.error('Failed to save recent search:', error);
        return getRecentSearches();
    }
};

export const removeRecentSearch = (indexToRemove) => {
    try {
        const recentSearches = getRecentSearches();
        const updatedSearches = recentSearches.filter((_, index) => index !== indexToRemove);
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
        return updatedSearches;
    } catch (error) {
        console.error('Failed to remove recent search:', error);
        return getRecentSearches();
    }
};

export const clearRecentSearches = () => {
    try {
        localStorage.removeItem(RECENT_SEARCHES_KEY);
        return [];
    } catch (error) {
        console.error('Failed to clear recent searches:', error);
        return [];
    }
};

const getCategoryDisplayName = (category) => {
    const categoryNames = {
        'all': '전체',
        'title': '책 제목',
        'authors': '저자',
        'publisher': '출판사'
    };
    return categoryNames[category] || '전체';
};

export const formatSearchDate = (timestamp) => {
    try {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            return `${diffDays}일 전`;
        } else if (diffHours > 0) {
            return `${diffHours}시간 전`;
        } else {
            return '방금 전';
        }
    } catch (error) {
        return '';
    }
};