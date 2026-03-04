import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../Common/ImageWithFallback';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const isValidUrl = (url) => { try { new URL(url); return true; } catch { return false; } };
const isImageUrl = (url) =>
    /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) ||
    /^https?:\/\/(search\.daum\.net|img\d*\.daumcdn\.net|t\d*\.daumcdn\.net)/i.test(url) ||
    /^https?:\/\/(.*\.(amazonaws\.com|googleusercontent\.com|imgur\.com|cloudinary\.com))/i.test(url) ||
    /\/(image|img|cover|thumbnail|photo|pic)/i.test(url);

const CoverImageInput = ({ value, onChange }) => {
    const [state, setState] = useState('none'); // none | validating | valid | warning | invalid
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (!value?.trim()) { setState('none'); setMsg(''); return; }
        const timer = setTimeout(() => {
            if (!isValidUrl(value)) { setState('invalid'); setMsg('올바른 URL 형식이 아닙니다'); return; }
            if (!isImageUrl(value)) { setState('invalid'); setMsg('이미지 URL 형식이 인식되지 않습니다'); return; }
            setState('validating'); setMsg('이미지를 확인하고 있습니다...');
            const img = new Image();
            // crossOrigin 제거: 카카오 등 외부 이미지는 CORS 헤더 없어도 <img>로 표시 가능
            const t = setTimeout(() => { setState('warning'); setMsg('이미지 로딩이 지연되고 있지만 사용 가능할 수 있습니다'); }, 10000);
            img.onload = () => { clearTimeout(t); setState('valid'); setMsg('유효한 이미지입니다'); };
            img.onerror = () => {
                clearTimeout(t);
                // onerror가 발생해도 실제 렌더링은 가능한 경우가 있으므로 warning 처리
                setState('warning');
                setMsg('이미지를 미리 확인할 수 없지만, 저장 후 표시될 수 있습니다');
            };
            img.src = value;
        }, 500);
        return () => clearTimeout(timer);
    }, [value]);

    const borderCls = {
        valid: 'border-emerald-400 focus:border-emerald-400 focus:ring-emerald-400',
        invalid: 'border-cover-500 focus:border-cover-500 focus:ring-cover-500',
        warning: 'border-amber-400 focus:border-amber-400 focus:ring-amber-400',
        validating: 'border-ink-400 focus:border-ink-400 focus:ring-ink-400',
    }[state] || 'border-linen-300 focus:border-ink-400 focus:ring-ink-400';

    const MsgIcon = { valid: CheckCircle, invalid: AlertCircle, warning: AlertCircle, validating: Loader2 }[state];
    const msgCls = { valid: 'text-emerald-600', invalid: 'text-cover-500', warning: 'text-amber-500', validating: 'text-ink-500' }[state] || '';

    return (
        <div>
            <input
                type="url"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://example.com/book-cover.jpg"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-lg text-charcoal-900 placeholder:text-charcoal-400 outline-none ring-1 ring-transparent transition-colors duration-200 ${borderCls}`}
            />

            {msg && MsgIcon && (
                <p className={`mt-1.5 text-xs flex items-center gap-1 ${msgCls}`}>
                    <MsgIcon className={`w-3.5 h-3.5 flex-shrink-0 ${state === 'validating' ? 'animate-spin' : ''}`} />
                    {msg}
                </p>
            )}

            {value && (state === 'valid' || state === 'warning') && (
                <div className="mt-3">
                    <ImageWithFallback
                        src={value}
                        alt="책 표지 미리보기"
                        style={{ maxWidth: '120px', maxHeight: '168px', borderRadius: '4px', border: '1px solid #D8D2C8' }}
                    />
                </div>
            )}
        </div>
    );
};

export default CoverImageInput;
