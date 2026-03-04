import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * ThemeToggle
 * - 아이콘 + 텍스트 형태, Navbar 링크 스타일과 동일
 * - "다크"(2자) ↔ "라이트"(3자) 글자 수 차이로 인한 레이아웃 이동을
 *   w-7 고정 너비로 방지 — DARK_MODE_GUIDE.md 3항 참조
 */
const ThemeToggle = ({ className = '' }) => {
    const { toggleTheme, isDark } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            aria-label={`${isDark ? '라이트' : '다크'} 모드로 전환`}
            className={`flex items-center gap-1.5 text-sm font-medium text-charcoal-700 hover:text-ink-500 transition-colors duration-200 ${className}`}
        >
            {isDark
                ? <Sun className="w-4 h-4 flex-shrink-0" />
                : <Moon className="w-4 h-4 flex-shrink-0" />
            }
            {/* w-10 고정 너비 — "라이트"(3자) 기준으로 여유 있게 확보. 레이아웃 이동 방지 */}
            <span className="inline-block w-10 text-left">
                {isDark ? '라이트' : '다크'}
            </span>
        </button>
    );
};

export default ThemeToggle;
