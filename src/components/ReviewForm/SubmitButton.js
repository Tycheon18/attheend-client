import React from 'react';
import { Save } from 'lucide-react';

const SubmitButton = ({ loading = false, children }) => {
    return (
        <button
            type="submit"
            disabled={loading}
            className="w-full btn-ink py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
            ) : (
                <Save className="w-4 h-4" />
            )}
            {children || '독후감 저장'}
        </button>
    );
};

export default SubmitButton;
