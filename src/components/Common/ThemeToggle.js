import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ className = '' }) => {
    const { currentTheme, toggleTheme, isDark } = useTheme();
    
    return (
        <button 
            className={`${styles.themeToggle} ${className}`}
            onClick={toggleTheme}
            aria-label={`${isDark ? '라이트' : '다크'} 모드로 전환`}
            title={`${isDark ? '라이트' : '다크'} 모드로 전환`}
        >
            <div className={styles.toggleContainer}>
                <div className={`${styles.toggleTrack} ${isDark ? styles.dark : styles.light}`}>
                    <div className={`${styles.toggleThumb} ${isDark ? styles.thumbDark : styles.thumbLight}`}>
                        <span className={styles.icon}>
                            {isDark ? '🌙' : '☀️'}
                        </span>
                    </div>
                </div>
            </div>
            <span className={styles.label}>
                {isDark ? '다크' : '라이트'}
            </span>
        </button>
    );
};

export default ThemeToggle;