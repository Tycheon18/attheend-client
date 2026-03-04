import React, { useState, useEffect } from 'react';
import ImageWithFallback from '../Common/ImageWithFallback';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const isValidUrl = (url) => { try { new URL(url); return true; } catch { return false; } };
const isImageUrl = (url) =>
    /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) ||
    /^https?:\/\/(search\.daum\.net|img\d*\.daumcdn\.net|t\d*\.daumcdn\.net)/i.test(url) ||
    /^https?:\/\/([a-z0-9]+\.)?kakaocdn\.net/i.test(url) ||
    /^https?:\/\/(.*\.(amazonaws\.com|googleusercontent\.com|imgur\.com|cloudinary\.com))/i.test(url) ||
    /\/(image|img|cover|thumbnail|photo|pic)/i.test(url);

const CoverImageInput = ({ value, onChange }) => {
    const [state, setState] = useState('none');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (!value?.trim()) { setState('none'); setMsg(''); return; }
        const timer = setTimeout(() => {
            if (!isValidUrl(value)) { setState('invalid'); setMsg('\uc62c\ubc14\ub978 URL \ud615\uc2dd\uc774 \uc544\ub2d9\ub2c8\ub2e4'); return; }
            if (!isImageUrl(value)) { setState('invalid'); setMsg('\uc774\ubbf8\uc9c0 URL \ud615\uc2dd\uc774 \uc778\uc2dd\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4'); return; }
            setState('validating'); setMsg('\uc774\ubbf8\uc9c0\ub97c \ud655\uc778\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4...');
            const img = new Image();
            const t = setTimeout(() => { setState('warning'); setMsg('\uc774\ubbf8\uc9c0 \ub85c\ub529\uc774 \uc9c0\uc5f0\ub418\uace0 \uc788\uc9c0\ub9cc \uc0ac\uc6a9 \uac00\ub2a5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4'); }, 10000);
            img.onload = () => { clearTimeout(t); setState('valid'); setMsg('\uc720\ud6a8\ud55c \uc774\ubbf8\uc9c0\uc785\ub2c8\ub2e4'); };
            img.onerror = () => {
                clearTimeout(t);
                setState('warning');
                setMsg('\uc774\ubbf8\uc9c0\ub97c \ubbf8\ub9ac \ud655\uc778\ud560 \uc218 \uc5c6\uc9c0\ub9cc, \uc800\uc7a5 \ud6c4 \ud45c\uc2dc\ub420 \uc218 \uc788\uc2b5\ub2c8\ub2e4');
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
                        alt="\ucc45 \ud45c\uc9c0 \ubbf8\ub9ac\ubcf4\uae30"
                        style={{ maxWidth: '120px', maxHeight: '168px', borderRadius: '4px', border: '1px solid #D8D2C8' }}
                    />
                </div>
            )}
        </div>
    );
};

export default CoverImageInput;
