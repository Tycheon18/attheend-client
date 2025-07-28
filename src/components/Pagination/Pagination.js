import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    totalCount, 
    onPageChange,
    itemsPerPage = 10 
}) => {
    const [inputPage, setInputPage] = useState('');
    
    // 특정 페이지로 직접 이동
    const handlePageClick = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            onPageChange(pageNum);
        }
    };
    
    // 입력 필드로 페이지 이동
    const handlePageInput = (e) => {
        if (e.key === 'Enter') {
            const pageNum = parseInt(inputPage);
            if (pageNum >= 1 && pageNum <= totalPages) {
                onPageChange(pageNum);
                setInputPage('');
            }
        }
    };
    
    // 페이지 번호 배열 생성 (현재 페이지 주변 4개씩 표시)
    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 4);
        const end = Math.min(totalPages, currentPage + 4);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };
    
    // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
    if (totalPages <= 1) {
        return null;
    }
    
    return (
        <div className={styles.paginationContainer}>
            {/* 페이지 번호 버튼들 */}
            <div className={styles.pageButtons}>
                <button 
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`${styles.pageButton} ${styles.prevButton} ${currentPage === 1 ? styles.disabled : ''}`}
                >
                    이전
                </button>
                
                {getPageNumbers().map(pageNum => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageClick(pageNum)}
                        className={`${styles.pageButton} ${pageNum === currentPage ? styles.active : ''}`}
                    >
                        {pageNum}
                    </button>
                ))}
                
                <button 
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`${styles.pageButton} ${styles.nextButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                >
                    다음
                </button>
            </div>
            
            {/* 직접 페이지 입력 */}
            <div className={styles.pageInput}>
                <span className={styles.inputLabel}>페이지 이동:</span>
                <input
                    type="number"
                    value={inputPage}
                    onChange={(e) => setInputPage(e.target.value)}
                    onKeyPress={handlePageInput}
                    placeholder={`1-${totalPages}`}
                    min="1"
                    max={totalPages}
                    className={styles.pageInputField}
                />
                <button
                    onClick={() => {
                        const pageNum = parseInt(inputPage);
                        if (pageNum >= 1 && pageNum <= totalPages) {
                            onPageChange(pageNum);
                            setInputPage('');
                        }
                    }}
                    className={styles.goButton}
                >
                    이동
                </button>
            </div>
            
            {/* 페이지 정보 */}
            <div className={styles.pageInfo}>
                {currentPage} / {totalPages} 페이지 (총 {totalCount}개 결과)
            </div>
        </div>
    );
};

export default Pagination; 