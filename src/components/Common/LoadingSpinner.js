import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 'medium', text, className }) => {
    const sizeClass = styles[size] || styles.medium;
    
    return (
        <div className={`${styles.spinnerContainer} ${className || ''}`}>
            <div className={`${styles.spinner} ${sizeClass}`}>
                <div className={styles.spinnerInner}></div>
            </div>
            {text && <p className={styles.spinnerText}>{text}</p>}
        </div>
    );
};

export default LoadingSpinner;