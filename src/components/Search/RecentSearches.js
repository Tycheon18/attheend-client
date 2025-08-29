import React, { useState, useEffect } from 'react';
import styles from './RecentSearches.module.css';
import { getRecentSearches, removeRecentSearch, clearRecentSearches, formatSearchDate } from '../../utils/recentSearchUtils';

const RecentSearches = ({ onSearchSelect, show = true }) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (show) {
            loadRecentSearches();
        }
    }, [show]);

    const loadRecentSearches = () => {
        const searches = getRecentSearches();
        setRecentSearches(searches);
    };

    const handleSearchClick = (search) => {
        onSearchSelect({
            category: search.category,
            query: search.query
        });
        setShowDropdown(false);
    };

    const handleRemoveSearch = (e, index) => {
        e.stopPropagation();
        const updatedSearches = removeRecentSearch(index);
        setRecentSearches(updatedSearches);
    };

    const handleClearAll = () => {
        const updatedSearches = clearRecentSearches();
        setRecentSearches(updatedSearches);
        setShowDropdown(false);
    };

    if (!show || recentSearches.length === 0) return null;

    return (
        <div className={styles.recentSearchesContainer}>
            <div 
                className={styles.recentSearchesHeader}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <div className={styles.headerContent}>
                    <span className={styles.headerIcon}>🕒</span>
                    <span className={styles.headerText}>최근 검색어</span>
                    <span className={styles.searchCount}>({recentSearches.length})</span>
                </div>
                <span className={styles.dropdownIcon}>
                    {showDropdown ? '▲' : '▼'}
                </span>
            </div>

            {showDropdown && (
                <div className={styles.searchList}>
                    <div className={styles.listHeader}>
                        <span className={styles.listTitle}>최근 검색어 목록</span>
                        <button 
                            className={styles.clearButton}
                            onClick={handleClearAll}
                        >
                            전체 삭제
                        </button>
                    </div>

                    {recentSearches.map((search, index) => (
                        <div 
                            key={index}
                            className={styles.searchItem}
                            onClick={() => handleSearchClick(search)}
                        >
                            <div className={styles.searchContent}>
                                <div className={styles.searchText}>
                                    <span className={styles.categoryBadge}>
                                        {search.category === 'all' ? '전체' : 
                                         search.category === 'title' ? '제목' :
                                         search.category === 'authors' ? '저자' :
                                         search.category === 'publisher' ? '출판사' : '전체'}
                                    </span>
                                    <span className={styles.queryText}>"{search.query}"</span>
                                </div>
                                <div className={styles.searchMeta}>
                                    <span className={styles.timestamp}>
                                        {formatSearchDate(search.timestamp)}
                                    </span>
                                </div>
                            </div>
                            <button 
                                className={styles.removeButton}
                                onClick={(e) => handleRemoveSearch(e, index)}
                                aria-label="검색어 삭제"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentSearches;