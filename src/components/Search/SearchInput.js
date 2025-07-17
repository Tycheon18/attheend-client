import styles from './SearchInput.module.css'

const SearchInput = ({ value, onChange }) => {
    return (
        <div className={styles.input_wrapper}>
            <input 
                type="text" 
                placeholder='Search'
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SearchInput;