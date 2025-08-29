
import SearchButton from "./SearchButton"
import SearchInput from "./SearchInput"
import styles from "./SearchBar.module.css"
import { useState, useEffect, useRef } from "react"
import { useToast } from '../Common/Toast'

const searchCategoryList = [
    { value: "all", label: "전체"},
    { value: "title", label: "책 제목"},
    { value: "authors", label: "저자"},
    { value: "publisher", label: "출판사"},
]

const SearchBar = ({ onSearch }) => {
    const [category, setCategory] = useState("all");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // 디바운싱을 위한 ref
    const debounceTimer = useRef(null);
    const DEBOUNCE_DELAY = 800; // 800ms 디바운싱
    
    // 토스트 훅 사용
    const { addToast } = useToast();

    const onChangeCategoryType = (e) => {
        setCategory(e.target.value);
    };

    const onChangeQuery = (e) => {
        setQuery(e.target.value);
    }
    
    // 쿼리나 카테고리 변경 시 디바운스된 검색 실행
    useEffect(() => {
        // 이전 타이머 클리어
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        
        // 2글자 이상일 때만 새로운 타이머 설정
        if (query.trim().length >= 2) {
            debounceTimer.current = setTimeout(() => {
                handleSearch(category, query);
            }, DEBOUNCE_DELAY);
        }
        
        // 컴포넌트 언마운트 시 타이머 정리
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [query, category]);

    const handleSearch = async (searchCategory = category, searchQuery = query) => {
        if (!searchQuery.trim()) return;
        
        if (searchQuery.trim().length < 2) {
            addToast('검색어는 2글자 이상 입력해주세요.', 'warning');
            return;
        }
        
        // 디바운스된 검색의 경우 타이머 클리어
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = null;
        }
        
        setLoading(true);
        setError(null);

        try {
            await onSearch({ category: searchCategory, query: searchQuery });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleClick = () => {
        handleSearch();
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={styles.searchContainer}>

            <div className={styles.Bar}>
                <div className={styles.category_wrapper}>
                    <select value={category} onChange={onChangeCategoryType}>
                        {searchCategoryList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.label}
                            </option>
                        ))}
                    </select>
                </div>    
                <SearchInput value={query} onChange={onChangeQuery} onKeyPress={handleKeyPress} />
                <SearchButton onClick={handleClick} disabled={loading} />
            </div>
        </div>
    );
}

export default SearchBar;