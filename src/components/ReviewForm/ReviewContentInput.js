import React, { useState, useEffect } from 'react';

const ReviewContentInput = ({ value, onChange, showValidation = false }) => {
    const [isTouched, setIsTouched] = useState(false);
    const [validationState, setValidationState] = useState('none'); // none, valid, invalid
    
    const MAX_LENGTH = 2000;
    const WARNING_THRESHOLD = 1800;
    const currentLength = value?.length || 0;
    const isEmpty = !value || !value.trim();
    const isValid = !isEmpty && currentLength > 0;
    
    useEffect(() => {
        if (isTouched || showValidation) {
            setValidationState(isValid ? 'valid' : 'invalid');
        } else {
            setValidationState('none');
        }
    }, [value, isTouched, showValidation, isValid]);
    
    const getCharacterCountColor = () => {
        if (currentLength >= MAX_LENGTH) return 'var(--color-error, #dc3545)'; // Red when at limit
        if (currentLength >= WARNING_THRESHOLD) return 'var(--color-warning, #ffc107)'; // Yellow when approaching limit
        return 'var(--color-text-secondary, #666)'; // Gray for normal state
    };
    
    const getBorderColor = () => {
        // Validation state takes priority over character count colors
        if (validationState === 'valid' && currentLength < WARNING_THRESHOLD) return 'var(--color-success, #28a745)';
        if (validationState === 'invalid') return 'var(--color-error, #dc3545)';
        
        // Character count based colors
        if (currentLength >= MAX_LENGTH) return 'var(--color-error, #dc3545)';
        if (currentLength >= WARNING_THRESHOLD) return 'var(--color-warning, #ffc107)';
        return 'var(--color-input-border, #ddd)';
    };
    
    const handleBlur = () => {
        setIsTouched(true);
    };
    
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= MAX_LENGTH) {
            onChange(newValue);
        }
    };
    
    return (
        <div>
            <textarea
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="독후감 내용을 자유롭게 작성해주세요..."
                rows={10}
                style={{
                    width: '100%',
                    padding: '12px',
                    border: `2px solid ${getBorderColor()}`,
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '200px',
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
                    color: validationState === 'valid' ? 'var(--color-success, #28a745)' : 'var(--color-error, #dc3545)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    {validationState === 'valid' && (
                        <>
                            <span>✅</span>
                            <span>독후감 내용이 입력되었습니다</span>
                        </>
                    )}
                    {validationState === 'invalid' && (
                        <>
                            <span>❌</span>
                            <span>독후감 내용을 입력해주세요</span>
                        </>
                    )}
                </div>
            )}
            
            {/* 글자 수 카운터 및 안내 메시지 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px',
                fontSize: '14px'
            }}>
                <div style={{
                    color: currentLength >= WARNING_THRESHOLD ? getCharacterCountColor() : 'var(--color-text-secondary, #666)'
                }}>
                    {currentLength >= WARNING_THRESHOLD && (
                        <span>
                            {currentLength >= MAX_LENGTH ? '⚠️ ' : '⚡ '}
                            {currentLength >= MAX_LENGTH 
                                ? '최대 글자 수에 도달했습니다' 
                                : '글자 수 제한에 가까워졌습니다'
                            }
                        </span>
                    )}
                </div>
                
                <div style={{
                    color: getCharacterCountColor(),
                    fontWeight: currentLength >= WARNING_THRESHOLD ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <span>{currentLength.toLocaleString()}</span>
                    <span>/</span>
                    <span>{MAX_LENGTH.toLocaleString()}</span>
                    {currentLength >= MAX_LENGTH && <span>🚫</span>}
                </div>
            </div>
        </div>
    );
};

export default ReviewContentInput;
