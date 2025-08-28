import styles from './SearchInput.module.css'

const SearchInput = ({ value, onChange, onKeyPress }) => {
    return (
        <div className={styles.input_wrapper}>
            <input 
                type="text" 
                placeholder='책 제목, 저자, 출판사를 검색해보세요...'
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
        </div>
    )
}

export default SearchInput;