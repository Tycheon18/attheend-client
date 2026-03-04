import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, totalCount, onPageChange, itemsPerPage = 10 }) => {
    const [inputPage, setInputPage] = useState('');

    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 4);
        const end = Math.min(totalPages, currentPage + 4);
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    const goToPage = (p) => {
        if (p >= 1 && p <= totalPages) onPageChange(p);
    };

    const handleInputGo = () => {
        const p = parseInt(inputPage);
        if (p >= 1 && p <= totalPages) { goToPage(p); setInputPage(''); }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col items-center gap-4">

            {/* 페이지 버튼 */}
            <div className="flex items-center gap-1">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded border border-linen-300 text-charcoal-600 hover:bg-linen-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((p) => (
                    <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                            p === currentPage
                                ? 'bg-ink-500 text-white border border-ink-500'
                                : 'border border-linen-300 text-charcoal-700 hover:bg-linen-100'
                        }`}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded border border-linen-300 text-charcoal-600 hover:bg-linen-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* 직접 이동 + 총 결과 */}
            <div className="flex items-center gap-3 text-sm text-charcoal-500">
                <span>{currentPage} / {totalPages} 페이지</span>
                <span className="text-linen-300">·</span>
                <span>총 {totalCount.toLocaleString()}개</span>
                <span className="text-linen-300">·</span>
                <div className="flex items-center gap-1.5">
                    <input
                        type="number"
                        value={inputPage}
                        onChange={(e) => setInputPage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputGo()}
                        placeholder={`1–${totalPages}`}
                        min="1"
                        max={totalPages}
                        className="w-16 text-center text-xs border border-linen-300 rounded px-2 py-1 bg-white text-charcoal-700 outline-none focus:border-ink-400"
                    />
                    <button
                        onClick={handleInputGo}
                        className="text-xs px-2.5 py-1 border border-linen-300 rounded hover:bg-linen-100 text-charcoal-700 transition-colors"
                    >
                        이동
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
