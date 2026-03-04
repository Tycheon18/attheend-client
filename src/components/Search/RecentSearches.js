import React, { useState, useEffect } from 'react';
import { Clock, X, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { getRecentSearches, removeRecentSearch, clearRecentSearches, formatSearchDate } from '../../utils/recentSearchUtils';

const CATEGORY_LABEL = { all: '전체', title: '제목', authors: '저자', publisher: '출판사' };

const RecentSearches = ({ onSearchSelect, show = true }) => {
    const [searches, setSearches] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (show) setSearches(getRecentSearches());
    }, [show]);

    const handleClick = (s) => {
        onSearchSelect({ category: s.category, query: s.query });
        setOpen(false);
    };

    const handleRemove = (e, idx) => {
        e.stopPropagation();
        setSearches(removeRecentSearch(idx));
    };

    const handleClear = () => {
        setSearches(clearRecentSearches());
        setOpen(false);
    };

    if (!show || searches.length === 0) return null;

    return (
        <div className="mt-3 border border-linen-300 rounded-lg overflow-hidden bg-white">

            {/* 헤더 토글 */}
            <button
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-charcoal-700 hover:bg-linen-50 transition-colors duration-150"
                onClick={() => setOpen(!open)}
            >
                <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-charcoal-500" />
                    <span className="font-medium">최근 검색어</span>
                    <span className="text-xs text-charcoal-500 bg-linen-100 px-1.5 py-0.5 rounded-full">
                        {searches.length}
                    </span>
                </span>
                {open ? <ChevronUp className="w-4 h-4 text-charcoal-500" /> : <ChevronDown className="w-4 h-4 text-charcoal-500" />}
            </button>

            {/* 드롭다운 목록 */}
            {open && (
                <div className="border-t border-linen-200">
                    {/* 상단 전체삭제 */}
                    <div className="flex items-center justify-between px-4 py-2 bg-linen-50 border-b border-linen-200">
                        <span className="text-xs text-charcoal-500">최근 검색어 목록</span>
                        <button
                            onClick={handleClear}
                            className="flex items-center gap-1 text-xs text-charcoal-500 hover:text-cover-500 transition-colors"
                        >
                            <Trash2 className="w-3 h-3" />
                            전체 삭제
                        </button>
                    </div>

                    {/* 항목 */}
                    {searches.map((s, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between px-4 py-2.5 hover:bg-linen-50 cursor-pointer transition-colors duration-100 border-b border-linen-100 last:border-none"
                            onClick={() => handleClick(s)}
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <Clock className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
                                <span className="text-xs px-1.5 py-0.5 bg-linen-100 text-charcoal-600 rounded flex-shrink-0">
                                    {CATEGORY_LABEL[s.category] || '전체'}
                                </span>
                                <span className="text-sm text-charcoal-900 truncate">"{s.query}"</span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                <span className="text-xs text-charcoal-400">{formatSearchDate(s.timestamp)}</span>
                                <button
                                    onClick={(e) => handleRemove(e, i)}
                                    className="text-charcoal-400 hover:text-cover-500 transition-colors"
                                    aria-label="검색어 삭제"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentSearches;
