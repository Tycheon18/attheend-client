import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../Common/ImageWithFallback';

const CoverImageInput = ({ value, onChange }) => {
    const [validationState, setValidationState] = useState('none'); // none, validating, valid, invalid
    const [validationMessage, setValidationMessage] = useState('');

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const isImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);
    };

    const validateImageUrl = async (url) => {
        if (!url.trim()) {
            setValidationState('none');
            setValidationMessage('');
            return;
        }

        if (!isValidUrl(url)) {
            setValidationState('invalid');
            setValidationMessage('올바른 URL 형식이 아닙니다');
            return;
        }

        if (!isImageUrl(url)) {
            setValidationState('invalid');
            setValidationMessage('이미지 파일 URL이 아닙니다 (jpg, png, gif, webp, svg만 지원)');
            return;
        }

        setValidationState('validating');
        setValidationMessage('이미지를 확인하고 있습니다...');

        try {
            const img = new Image();
            img.onload = () => {
                setValidationState('valid');
                setValidationMessage('✅ 유효한 이미지입니다');
            };
            img.onerror = () => {
                setValidationState('invalid');
                setValidationMessage('이미지를 불러올 수 없습니다');
            };
            img.src = url;
        } catch {
            setValidationState('invalid');
            setValidationMessage('이미지 검증 중 오류가 발생했습니다');
        }
    };

    useEffect(() => {
        if (value) {
            const timer = setTimeout(() => {
                validateImageUrl(value);
            }, 500); // 0.5초 디바운싱
            return () => clearTimeout(timer);
        } else {
            setValidationState('none');
            setValidationMessage('');
        }
    }, [value]);

    const getBorderColor = () => {
        switch (validationState) {
            case 'valid': return '#28a745';
            case 'invalid': return '#dc3545';
            case 'validating': return '#007bff';
            default: return '#ddd';
        }
    };

    const getValidationColor = () => {
        switch (validationState) {
            case 'valid': return '#28a745';
            case 'invalid': return '#dc3545';
            case 'validating': return '#007bff';
            default: return '#666';
        }
    };

    return (
        <div>
            <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/book-cover.jpg"
                style={{
                    width: '100%',
                    padding: '10px',
                    border: `2px solid ${getBorderColor()}`,
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: '#fff',
                    transition: 'border-color 0.2s ease'
                }}
            />
            
            {/* 검증 피드백 메시지 */}
            {validationMessage && (
                <div style={{
                    marginTop: '8px',
                    fontSize: '14px',
                    color: getValidationColor(),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    {validationState === 'validating' && (
                        <div style={{
                            width: '12px',
                            height: '12px',
                            border: '2px solid #007bff',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                    )}
                    {validationMessage}
                </div>
            )}

            {/* 이미지 미리보기 */}
            {value && validationState === 'valid' && (
                <div style={{ marginTop: '15px' }}>
                    <ImageWithFallback
                        src={value}
                        alt="책 표지 미리보기"
                        style={{
                            maxWidth: '150px',
                            maxHeight: '200px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
            )}
            
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default CoverImageInput;
