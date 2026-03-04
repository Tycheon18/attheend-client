import React, { createContext, useContext, useState, useEffect } from 'react';

// 테마 컨텍스트 생성
const ThemeContext = createContext();

// 테마 설정
export const themes = {
    light: {
        name: 'light',
        colors: {
            // 기본 배경색
            background: '#ffffff',
            surface: '#f8f9fa',
            surfaceVariant: '#e9ecef',
            
            // 텍스트 색상
            text: '#212529',
            textSecondary: '#6c757d',
            textMuted: '#adb5bd',
            
            // 브랜드 색상
            primary: '#007bff',
            primaryHover: '#0056b3',
            secondary: '#6c757d',
            
            // 상태 색상
            success: '#28a745',
            successHover: '#218838',
            successActive: '#1e7e34',
            warning: '#ffc107',
            error: '#dc3545',
            info: '#17a2b8',
            
            // 상태별 surface 색상 (토스트, 에러메시지용)
            successSurface: '#d4edda',
            successBorder: '#c3e6cb',
            successText: '#155724',
            warningSurface: '#fff3cd',
            warningBorder: '#ffeaa7',
            warningText: '#856404',
            errorSurface: '#f8d7da',
            errorBorder: '#f5c6cb',
            errorText: '#721c24',
            infoSurface: '#d1ecf1',
            infoBorder: '#bee5eb',
            infoText: '#0c5460',
            
            // 테두리 색상
            border: '#dee2e6',
            borderLight: '#f1f3f4',
            
            // 그림자
            shadow: 'rgba(0, 0, 0, 0.1)',
            shadowHover: 'rgba(0, 0, 0, 0.15)',
            shadowToast: '0 4px 12px rgba(0, 0, 0, 0.15)',
            
            // 기타
            onPrimary: '#ffffff',
            onSuccess: '#ffffff',
            hoverOverlay: 'rgba(0, 0, 0, 0.1)',
            
            // 입력 필드
            input: {
                background: '#ffffff',
                border: '#ced4da',
                focus: '#80bdff',
                placeholder: '#6c757d'
            },
            
            // 카드/컨테이너
            card: {
                background: '#ffffff',
                border: '#e9ecef',
                shadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }
        }
    },
    dark: {
        name: 'dark',
        colors: {
            // 기본 배경색
            background: '#121212',
            surface: '#1e1e1e',
            surfaceVariant: '#2d2d2d',
            
            // 텍스트 색상
            text: '#e0e0e0',
            textSecondary: '#a0a0a0',
            textMuted: '#757575',
            
            // 브랜드 색상
            primary: '#4fc3f7',
            primaryHover: '#29b6f6',
            secondary: '#757575',
            
            // 상태 색상
            success: '#4caf50',
            successHover: '#43a047',
            successActive: '#388e3c',
            warning: '#ff9800',
            error: '#f44336',
            info: '#2196f3',
            
            // 상태별 surface 색상 (다크모드용)
            successSurface: '#1b5e20',
            successBorder: '#2e7d32',
            successText: '#c8e6c9',
            warningSurface: '#e65100',
            warningBorder: '#f57c00',
            warningText: '#ffe0b2',
            errorSurface: '#b71c1c',
            errorBorder: '#d32f2f',
            errorText: '#ffcdd2',
            infoSurface: '#0d47a1',
            infoBorder: '#1976d2',
            infoText: '#bbdefb',
            
            // 테두리 색상
            border: '#404040',
            borderLight: '#333333',
            
            // 그림자
            shadow: 'rgba(0, 0, 0, 0.3)',
            shadowHover: 'rgba(0, 0, 0, 0.4)',
            shadowToast: '0 4px 12px rgba(0, 0, 0, 0.4)',
            
            // 기타
            onPrimary: '#000000',
            onSuccess: '#000000',
            hoverOverlay: 'rgba(255, 255, 255, 0.1)',
            
            // 입력 필드
            input: {
                background: '#2d2d2d',
                border: '#404040',
                focus: '#4fc3f7',
                placeholder: '#a0a0a0'
            },
            
            // 카드/컨테이너
            card: {
                background: '#1e1e1e',
                border: '#333333',
                shadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
            }
        }
    }
};

// 테마 프로바이더 컴포넌트
export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('light');
    
    // 로컬스토리지에서 테마 설정 불러오기
    useEffect(() => {
        const savedTheme = localStorage.getItem('attheend-theme');
        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
        } else {
            // 시스템 다크모드 감지
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setCurrentTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);
    
    // 테마 변경 함수
    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        localStorage.setItem('attheend-theme', newTheme);
    };
    
    const setTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
            localStorage.setItem('attheend-theme', themeName);
        }
    };
    
    // 현재 테마 객체
    const theme = themes[currentTheme];
    
    // CSS 커스텀 속성으로 테마 적용
    useEffect(() => {
        const root = document.documentElement;
        const colors = theme.colors;
        
        // CSS 변수 설정
        root.style.setProperty('--color-background', colors.background);
        root.style.setProperty('--color-surface', colors.surface);
        root.style.setProperty('--color-surface-variant', colors.surfaceVariant);
        root.style.setProperty('--color-text', colors.text);
        root.style.setProperty('--color-text-secondary', colors.textSecondary);
        root.style.setProperty('--color-text-muted', colors.textMuted);
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-primary-hover', colors.primaryHover);
        root.style.setProperty('--color-secondary', colors.secondary);
        root.style.setProperty('--color-success', colors.success);
        root.style.setProperty('--color-success-hover', colors.successHover);
        root.style.setProperty('--color-success-active', colors.successActive);
        root.style.setProperty('--color-warning', colors.warning);
        root.style.setProperty('--color-error', colors.error);
        root.style.setProperty('--color-info', colors.info);
        
        // 상태별 surface 색상
        root.style.setProperty('--color-success-surface', colors.successSurface);
        root.style.setProperty('--color-success-border', colors.successBorder);
        root.style.setProperty('--color-success-text', colors.successText);
        root.style.setProperty('--color-warning-surface', colors.warningSurface);
        root.style.setProperty('--color-warning-border', colors.warningBorder);
        root.style.setProperty('--color-warning-text', colors.warningText);
        root.style.setProperty('--color-error-surface', colors.errorSurface);
        root.style.setProperty('--color-error-border', colors.errorBorder);
        root.style.setProperty('--color-error-text', colors.errorText);
        root.style.setProperty('--color-info-surface', colors.infoSurface);
        root.style.setProperty('--color-info-border', colors.infoBorder);
        root.style.setProperty('--color-info-text', colors.infoText);
        root.style.setProperty('--color-border', colors.border);
        root.style.setProperty('--color-border-light', colors.borderLight);
        root.style.setProperty('--color-shadow', colors.shadow);
        root.style.setProperty('--color-shadow-hover', colors.shadowHover);
        root.style.setProperty('--color-shadow-toast', colors.shadowToast);
        root.style.setProperty('--color-on-primary', colors.onPrimary);
        root.style.setProperty('--color-on-success', colors.onSuccess);
        root.style.setProperty('--color-hover-overlay', colors.hoverOverlay);
        
        // 입력 필드
        root.style.setProperty('--color-input-background', colors.input.background);
        root.style.setProperty('--color-input-border', colors.input.border);
        root.style.setProperty('--color-input-focus', colors.input.focus);
        root.style.setProperty('--color-input-placeholder', colors.input.placeholder);
        
        // 카드
        root.style.setProperty('--color-card-background', colors.card.background);
        root.style.setProperty('--color-card-border', colors.card.border);
        root.style.setProperty('--color-card-shadow', colors.card.shadow);
        
        // body 배경색 즉시 적용
        document.body.style.backgroundColor = colors.background;
        document.body.style.color = colors.text;
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

        // Tailwind darkMode: 'class' 연동 — <html class="dark"> 토글
        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
    }, [theme]);
    
    const value = {
        currentTheme,
        theme,
        toggleTheme,
        setTheme,
        isDark: currentTheme === 'dark'
    };
    
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// 테마 훅
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};