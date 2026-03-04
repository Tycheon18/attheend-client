import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const ReviewTitleInput = ({ value, onChange, showValidation = false }) => {
    const [touched, setTouched] = useState(false);
    const isValid = value?.trim().length > 0;
    const showError = (touched || showValidation) && !isValid;
    const showSuccess = (touched || showValidation) && isValid;

    const borderCls = showError
        ? 'border-cover-500 ring-1 ring-cover-500'
        : showSuccess
        ? 'border-emerald-400 ring-1 ring-emerald-400'
        : 'border-linen-300';

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="책 제목을 입력하세요"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-charcoal-900 placeholder:text-charcoal-400 outline-none focus:border-ink-400 focus:ring-1 focus:ring-ink-400 transition-colors duration-200 ${borderCls}`}
            />
            {showError && (
                <p className="mt-1.5 text-xs text-cover-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> 책 제목을 입력해주세요
                </p>
            )}
            {showSuccess && (
                <p className="mt-1.5 text-xs text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 책 제목이 입력되었습니다
                </p>
            )}
        </div>
    );
};

export default ReviewTitleInput;
