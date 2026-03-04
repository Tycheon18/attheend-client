import React from 'react';

const SORT_OPTIONS = [
    { value: 'relevance', label: '관련도순' },
    { value: 'title',     label: '제목순'   },
    { value: 'authors',   label: '저자순'   },
    { value: 'publisher', label: '출판사순' },
    { value: 'datetime',  label: '출간일순' },
];

const SortOptions = ({ sortBy, onSortChange, resultsCount = 0 }) => {
    if (resultsCount === 0) return null;

    return (
        <div className="flex items-center justify-between mt-4 mb-2 py-3 border-b border-linen-300">
            {/* 정렬 탭 */}
            <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs text-charcoal-500 mr-1">정렬</span>
                {SORT_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onSortChange(opt.value)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-colors duration-150 font-medium ${
                            sortBy === opt.value
                                ? 'bg-ink-500 text-white'
                                : 'bg-linen-100 text-charcoal-700 hover:bg-linen-200'
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SortOptions;
