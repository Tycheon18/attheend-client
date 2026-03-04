import React, { useState, useEffect, createContext, useContext } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

// ── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
        setTimeout(() => removeToast(id), duration);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

// ── 타입별 스타일 & 아이콘 ────────────────────────────────────────────────────
const TYPE_CONFIG = {
    success: {
        icon: CheckCircle,
        cls: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-200',
    },
    error: {
        icon: XCircle,
        cls: 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-200',
    },
    warning: {
        icon: AlertTriangle,
        cls: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200',
    },
    info: {
        icon: Info,
        cls: 'bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-950 dark:border-sky-800 dark:text-sky-200',
    },
};

// ── Toast Container ───────────────────────────────────────────────────────────
const ToastContainer = ({ toasts, onRemove }) => {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none max-sm:top-2.5 max-sm:right-2.5 max-sm:left-2.5">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
};

// ── Toast Item ────────────────────────────────────────────────────────────────
const ToastItem = ({ toast, onRemove }) => {
    const [visible, setVisible]   = useState(false);
    const [leaving, setLeaving]   = useState(false);
    const { icon: Icon, cls }     = TYPE_CONFIG[toast.type] ?? TYPE_CONFIG.info;

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(t);
    }, []);

    const handleClose = () => {
        setLeaving(true);
        setTimeout(() => onRemove(toast.id), 300);
    };

    const isIn = visible && !leaving;

    return (
        <div
            className={`pointer-events-auto flex items-center justify-between
                        min-w-[300px] max-sm:min-w-0
                        px-4 py-3.5 rounded-lg border text-sm font-medium shadow-md
                        transition-all duration-300 ${cls}`}
            style={{
                transform: isIn ? 'translateX(0)' : 'translateX(calc(100% + 24px))',
                opacity:   isIn ? 1 : 0,
            }}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <Icon className="w-4 h-4 flex-shrink-0" aria-hidden />
                <span className="leading-snug">{toast.message}</span>
            </div>
            <button
                onClick={handleClose}
                className="ml-3 flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                aria-label="닫기"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};
