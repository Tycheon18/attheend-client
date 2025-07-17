import styles from './SearchButton.module.css';

const SearchButton = ({ onClick, disabled }) => {
    return (
        <div className={styles.button_wrapper}>
            <button
                onClick={onClick}
                disabled={disabled}
            >
                {disabled ? "검색중..." : "검색"}
            </button>
        </div>
    );
}

export default SearchButton;