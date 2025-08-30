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
        // 카카오 API나 기타 책 표지 이미지 URL 패턴 허용
        // 1. 일반적인 이미지 확장자 체크
        if (/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url)) {
            return true;
        }
        
        // 2. 카카오 API URL 패턴 (search.daum.net, img1.daumcdn.net 등)
        if (/^https?:\/\/(search\.daum\.net|img\d*\.daumcdn\.net|t\d*\.daumcdn\.net)/i.test(url)) {
            return true;
        }
        
        // 3. 기타 일반적인 이미지 호스팅 URL 패턴
        if (/^https?:\/\/(.*\.(amazonaws\.com|googleusercontent\.com|imgur\.com|cloudinary\.com))/i.test(url)) {
            return true;
        }
        
        // 4. URL에 'image', 'cover', 'thumbnail' 등 이미지 관련 키워드가 포함된 경우
        if (/\/(image|img|cover|thumbnail|photo|pic)/i.test(url)) {
            return true;
        }
        
        return false;
    };

    const validateImageUrl = async (url) => {
        // 안전장치: 유효하지 않은 입력 체크
        if (!url || typeof url !== 'string' || !url.trim()) {
            setValidationState('none');
            setValidationMessage('');
            return;
        }

        const trimmedUrl = url.trim();

        if (!isValidUrl(trimmedUrl)) {
            setValidationState('invalid');
            setValidationMessage('올바른 URL 형식이 아닙니다');
            return;
        }

        if (!isImageUrl(trimmedUrl)) {
            setValidationState('invalid');
            setValidationMessage('이미지 URL 형식이 인식되지 않습니다. 이미지 파일이나 책 표지 URL인지 확인해주세요.');
            return;
        }

        setValidationState('validating');
        setValidationMessage('이미지를 확인하고 있습니다...');

        try {
            const img = new Image();
            
            // CORS 문제 방지를 위해 crossOrigin 설정
            img.crossOrigin = 'anonymous';
            
            // 타임아웃 설정 (10초로 늘림 - 외부 API 응답 고려)
            const timeoutId = setTimeout(() => {
                setValidationState('warning');
                setValidationMessage('⏰ 이미지 로딩이 지연되고 있지만 사용 가능할 수 있습니다');
            }, 10000);
            
            img.onload = () => {
                clearTimeout(timeoutId);
                setValidationState('valid');
                setValidationMessage('✅ 유효한 이미지입니다');
            };
            
            img.onerror = () => {
                clearTimeout(timeoutId);
                // HTTP URL의 경우 HTTPS 사이트에서 로딩 실패할 수 있으므로 경고로 처리
                if (trimmedUrl.startsWith('http://')) {
                    setValidationState('warning');
                    setValidationMessage('⚠️ HTTP 이미지는 일부 브라우저에서 로딩되지 않을 수 있습니다');
                } else {
                    setValidationState('invalid');
                    setValidationMessage('이미지를 불러올 수 없습니다');
                }
            };
            
            img.src = trimmedUrl;
        } catch (error) {
            console.warn('Image validation error:', error);
            setValidationState('warning');
            setValidationMessage('⚠️ 이미지 검증에 실패했지만 사용 가능할 수 있습니다');
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 즉시 상태 초기화
        if (!value || !value.trim()) {
            setValidationState('none');
            setValidationMessage('');
            return;
        }
        
        // 유효한 값이 있을 때만 검증 실행
        const timer = setTimeout(() => {
            try {
                validateImageUrl(value);
            } catch (error) {
                console.warn('Image validation error:', error);
                setValidationState('none');
                setValidationMessage('');
            }
        }, 500); // 0.5초 디바운싱
        
        return () => clearTimeout(timer);
    }, [value]);

    const getBorderColor = () => {
        switch (validationState) {
            case 'valid': return 'var(--color-success, #28a745)';
            case 'invalid': return 'var(--color-error, #dc3545)';
            case 'warning': return 'var(--color-warning, #ffc107)';
            case 'validating': return 'var(--color-primary, #007bff)';
            default: return 'var(--color-input-border, #ddd)';
        }
    };

    const getValidationColor = () => {
        switch (validationState) {
            case 'valid': return 'var(--color-success, #28a745)';
            case 'invalid': return 'var(--color-error, #dc3545)';
            case 'warning': return 'var(--color-warning, #ffc107)';
            case 'validating': return 'var(--color-primary, #007bff)';
            default: return 'var(--color-text-secondary, #666)';
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
                    backgroundColor: 'var(--color-input-background, #fff)',
                    color: 'var(--color-text, #333)',
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
            {value && (validationState === 'valid' || validationState === 'warning') && (
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
