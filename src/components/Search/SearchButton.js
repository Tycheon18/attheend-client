import styles from './SearchButton.module.css';
import LoadingSpinner from '../Common/LoadingSpinner';

const SearchButton = ({ onClick, disabled }) => {
    return (
        <div className={styles.button_wrapper}>
            <button
                onClick={onClick}
                disabled={disabled}
            >
                {disabled ? (
                    <LoadingSpinner size="small" className={styles.inlineSpinner} />
                ) : (
                    "🔍 검색"
                )}
            </button>
        </div>
    );
}

export default SearchButton;