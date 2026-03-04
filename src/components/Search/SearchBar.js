import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useToast } from '../Common/Toast';

const CATEGORY_LIST = [
    { value: 'all',       label: '전체'   },
    { value: 'title',     label: '책 제목' },
    { value: 'authors',   label: '저자'   },
    { value: 'publisher', label: '출판사' },
];

const DEBOUNCE_DELAY = 800;

const SearchBar = ({ onSearch }) => {
    const [category, setCategory] = useState('all');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const debounceTimer = useRef(null);
    const { addToast } = useToast();

    const handleSearch = async (searchCategory = category, searchQuery = query) => {
        if (!searchQuery.trim()) return;
        if (searchQuery.trim().length < 2) {
            addToast('검색어는 2글자 이상 입력해주세요.', 'warning');
            return;
        }
        if (debounceTimer.current) { clearTimeout(debounceTimer.current); debounceTimer.current = null; }
        setLoading(true);
        try {
            await onSearch({ category: searchCategory, query: searchQuery });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        if (query.trim().length >= 2) {
            debounceTimer.current = setTimeout(() => handleSearch(category, query), DEBOUNCE_DELAY);
        }
        return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, category]);

    return (
        <div className="w-full">
            <div className="flex rounded-lg border border-linen-300 overflow-hidden bg-white shadow-sm focus-within:border-ink-400 focus-within:ring-1 focus-within:ring-ink-400 transition-all duration-200">
                <div className="relative flex-shrink-0" style={{ borderRight: '1px solid #D8D2C8' }}>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="appearance-none bg-linen-50 border-none text-sm py-3.5 pl-4 pr-9 text-charcoal-700 outline-none cursor-pointer h-full"
                    >
                        {CATEGORY_LIST.map((it) => (
                            <option key={it.value} value={it.value}>{it.label}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="책 제목, 저자, 출판사를 검색해보세요..."
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm py-3.5 px-4 text-charcoal-900 placeholder:text-charcoal-500 font-sans"
                />
                <button
                    onClick={() => handleSearch()}
                    disabled={loading}
                    className="btn-ink text-sm px-5 m-1.5 rounded flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                    ) : (
                        <Search className="w-4 h-4" />
                    )}
                    검색
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
