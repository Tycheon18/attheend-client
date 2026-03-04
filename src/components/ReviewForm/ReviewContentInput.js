import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const MAX_LENGTH = 2000;
const WARN_AT = 1800;

const ReviewContentInput = ({ value, onChange, showValidation = false }) => {
    const [touched, setTouched] = useState(false);
    const len = value?.length || 0;
    const isValid = value?.trim().length > 0;
    const showError = (touched || showValidation) && !isValid;
    const showSuccess = (touched || showValidation) && isValid && len < WARN_AT;

    const borderCls = showError
        ? 'border-cover-500 ring-1 ring-cover-500'
        : len >= MAX_LENGTH
        ? 'border-cover-500'
        : len >= WARN_AT
        ? 'border-amber-400'
        : showSuccess
        ? 'border-emerald-400'
        : 'border-linen-300';

    const counterCls = len >= MAX_LENGTH
        ? 'text-cover-500 font-bold'
        : len >= WARN_AT
        ? 'text-amber-500 font-semibold'
        : 'text-charcoal-400';

    const handleChange = (e) => {
        if (e.target.value.length <= MAX_LENGTH) onChange(e.target.value);
    };

    return (
        <div>
            <textarea
                value={value}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
                placeholder="독후감 내용을 자유롭게 작성해주세요..."
                rows={10}
                className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-charcoal-900 placeholder:text-charcoal-400 outline-none focus:border-ink-400 focus:ring-1 focus:ring-ink-400 resize-vertical min-h-[200px] font-sans leading-relaxed transition-colors duration-200 ${borderCls}`}
            />

            {/* 검증 메시지 + 글자수 */}
            <div className="mt-1.5 flex items-center justify-between">
                <div className="text-xs">
                    {showError && (
                        <p className="text-cover-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> 독후감 내용을 입력해주세요
                        </p>
                    )}
                    {showSuccess && (
                        <p className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> 독후감 내용이 입력되었습니다
                        </p>
                    )}
                    {len >= WARN_AT && (
                        <p className="text-amber-500">
                            {len >= MAX_LENGTH ? '⚠️ 최대 글자 수에 도달했습니다' : '⚡ 글자 수 제한에 가까워졌습니다'}
                        </p>
                    )}
                </div>
                <span className={`text-xs tabular-nums ${counterCls}`}>
                    {len.toLocaleString()} / {MAX_LENGTH.toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default ReviewContentInput;
