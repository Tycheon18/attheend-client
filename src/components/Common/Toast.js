import React, { useState, useEffect, createContext, useContext } from 'react';
import styles from './Toast.module.css';

// Toast Context
const ToastContext = createContext();

// Toast Provider 컴포넌트
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now() + Math.random();
        const toast = { id, message, type, duration };
        
        setToasts(prev => [...prev, toast]);
        
        // 자동 제거
        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

// Toast Hook
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// Toast Container 컴포넌트
const ToastContainer = ({ toasts, onRemove }) => {
    if (toasts.length === 0) return null;

    return (
        <div className={styles.toastContainer}>
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

// 개별 Toast 컴포넌트
const ToastItem = ({ toast, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        // 입장 애니메이션
        setTimeout(() => setIsVisible(true), 10);
    }, []);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => {
            onRemove(toast.id);
        }, 300);
    };

    const getIcon = () => {
        switch(toast.type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '✅';
        }
    };

    return (
        <div 
            className={`
                ${styles.toast} 
                ${styles[toast.type]} 
                ${isVisible ? styles.visible : ''} 
                ${isLeaving ? styles.leaving : ''}
            `}
        >
            <div className={styles.toastContent}>
                <span className={styles.toastIcon}>{getIcon()}</span>
                <span className={styles.toastMessage}>{toast.message}</span>
            </div>
            <button 
                className={styles.closeButton}
                onClick={handleClose}
            >
                ×
            </button>
        </div>
    );
};