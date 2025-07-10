
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

const SearchBar = () => {
    const [category, setCategory] = useState("all");

    const onChangeCategoryType = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className={styles.Bar}>
            <select value={category} onChange={onChangeCategoryType}>
                {searchCategoryList.map((it, idx) => (
                    <option key={idx} value={it.value}>
                        {it.label}
                    </option>
                ))}
            </select>
            <SearchInput />
            <SearchButton />
        </div>
    );
}

export default SearchBar;