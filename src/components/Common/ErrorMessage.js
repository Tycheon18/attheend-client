import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ 
    title = "오류가 발생했습니다", 
    message, 
    onRetry, 
    retryText = "다시 시도",
    type = "error" // error, warning, info
}) => {
    const getIcon = () => {
        switch(type) {
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '❌';
        }
    };

    return (
        <div className={`${styles.errorContainer} ${styles[type]}`}>
            <div className={styles.errorIcon}>
                {getIcon()}
            </div>
            <div className={styles.errorContent}>
                <h3 className={styles.errorTitle}>{title}</h3>
                {message && <p className={styles.errorMessage}>{message}</p>}
                {onRetry && (
                    <button 
                        className={styles.retryButton}
                        onClick={onRetry}
                    >
                        🔄 {retryText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;