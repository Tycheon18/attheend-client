import React from 'react';
import styles from './SortOptions.module.css';

const sortOptionsList = [
    { value: 'relevance', label: '관련도순', icon: '🎯' },
    { value: 'title', label: '제목순', icon: '📖' },
    { value: 'authors', label: '저자순', icon: '👥' },
    { value: 'publisher', label: '출판사순', icon: '🏢' },
    { value: 'datetime', label: '출간일순', icon: '📅' }
];

const SortOptions = ({ sortBy, onSortChange, resultsCount = 0 }) => {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    if (resultsCount === 0) return null;

    return (
        <div className={styles.sortContainer}>
            <div className={styles.sortWrapper}>
                <span className={styles.sortLabel}>
                    🔄 정렬:
                </span>
                <select 
                    value={sortBy} 
                    onChange={handleSortChange}
                    className={styles.sortSelect}
                >
                    {sortOptionsList.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.icon} {option.label}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className={styles.resultInfo}>
                <span className={styles.resultCount}>
                    {resultsCount.toLocaleString()}개 결과
                </span>
            </div>
        </div>
    );
};

export default SortOptions;