import React, { useState, useEffect } from 'react';

const ReviewTitleInput = ({ value, onChange, showValidation = false }) => {
    const [isTouched, setIsTouched] = useState(false);
    const [validationState, setValidationState] = useState('none'); // none, valid, invalid
    
    const isEmpty = !value || !value.trim();
    const isValid = !isEmpty;
    
    useEffect(() => {
        if (isTouched || showValidation) {
            setValidationState(isValid ? 'valid' : 'invalid');
        } else {
            setValidationState('none');
        }
    }, [value, isTouched, showValidation, isValid]);
    
    const getBorderColor = () => {
        switch (validationState) {
            case 'valid': return 'var(--color-success, #28a745)';
            case 'invalid': return 'var(--color-error, #dc3545)';
            default: return 'var(--color-input-border, #ddd)';
        }
    };
    
    const getValidationColor = () => {
        switch (validationState) {
            case 'valid': return 'var(--color-success, #28a745)';
            case 'invalid': return 'var(--color-error, #dc3545)';
            default: return 'var(--color-text-secondary, #666)';
        }
    };
    
    const handleBlur = () => {
        setIsTouched(true);
    };
    
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={handleBlur}
                placeholder="책 제목을 입력하세요"
                style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${getBorderColor()}`,
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'var(--color-input-background, #fff)',
                    color: 'var(--color-text, #333)',
                    transition: 'border-color 0.2s ease'
                }}
            />
            
            {/* 실시간 검증 피드백 */}
            {validationState !== 'none' && (
                <div style={{
                    marginTop: '6px',
                    fontSize: '14px',
                    color: getValidationColor(),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    {validationState === 'valid' && (
                        <>
                            <span>✅</span>
                            <span>책 제목이 입력되었습니다</span>
                        </>
                    )}
                    {validationState === 'invalid' && (
                        <>
                            <span>❌</span>
                            <span>책 제목을 입력해주세요</span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewTitleInput;