
import SearchButton from "./SearchButton"
import SearchInput from "./SearchInput"
import styles from "./SearchBar.module.css"
import { useState } from "react"

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

    const onChangeCategoryType = (e) => {
        setCategory(e.target.value);
    };

    const onChangeQuery = (e) => {
        setQuery(e.target.value);
    }

    const handleSearch = async () => {
        if (!query.trim()) return;
        
        setLoading(true);
        setError(null);

        try {
            await onSearch({ category, query });
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