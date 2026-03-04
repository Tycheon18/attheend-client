import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { BookOpen, Star, Calendar, Tag } from 'lucide-react';

/**
 * FeatureCard — ProductCard를 독서 앱 Feature 카드로 어댑트
 *
 * ProductCard의 스크롤 트리거 애니메이션 패턴을 계승하되,
 * 상품 대신 "기능 소개" 용도에 맞춘 레이아웃으로 변경.
 *
 * variant:
 *   'numbered'  — 01 / 02 / 03 스타일 번호 (B테마 기본)
 *   'icon'      — 이모지/아이콘 강조 스타일
 *   'bordered'  — 하단 컬러 보더 강조 스타일
 */
const FeatureCard = ({
  number,
  icon,
  title,
  description,
  chip,
  variant = 'numbered',
  accentColor = 'ink',
  href,
  hrefLabel,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer — ProductCard와 동일한 패턴
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // accent 색상 맵
  const accentMap = {
    ink:   { text: 'text-ink-500',  bg: 'bg-ink-500',  border: 'border-ink-400',  chip: 'bg-ink-50 text-ink-500' },
    spine: { text: 'text-spine-500', bg: 'bg-spine-500', border: 'border-spine-400', chip: 'bg-amber-50 text-spine-500' },
    cover: { text: 'text-cover-500', bg: 'bg-cover-500', border: 'border-cover-500', chip: 'bg-red-50 text-cover-500' },
  };
  const accent = accentMap[accentColor] || accentMap.ink;

  return (
    <div
      ref={cardRef}
      className={`
        relative bg-white border border-linen-300 overflow-hidden
        transition-all duration-500 cursor-default group
        ${variant === 'bordered' ? 'rounded-xl' : 'rounded-none'}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
    >
      {/* bordered variant: 하단 컬러 라인 */}
      {variant === 'bordered' && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${accent.bg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
        />
      )}

      {/* 내부 패딩 */}
      <div className="p-8 flex flex-col flex-1">
        {/* 번호 or 아이콘 */}
        {variant === 'numbered' && number && (
          <div
            className={`font-serif text-5xl font-bold leading-none mb-5 select-none text-linen-200`}
          >
            {String(number).padStart(2, '0')}
          </div>
        )}
        {variant === 'icon' && icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-content-center mb-5 text-2xl leading-none flex items-center justify-center`}
            style={{ background: 'var(--color-surface2)' }}
          >
            {icon}
          </div>
        )}

        {/* 제목 */}
        <h3 className="text-base font-semibold text-charcoal-900 mb-3 leading-snug">
          {icon && variant !== 'icon' && (
            <span className="mr-2">{icon}</span>
          )}
          {title}
        </h3>

        {/* 설명 */}
        <p className="text-sm text-charcoal-700 leading-relaxed flex-1">
          {description}
        </p>

        {/* 칩 + 링크 */}
        <div className="mt-5 flex items-center justify-between">
          {chip && (
            <span className={`text-xs px-2.5 py-1 rounded ${accent.chip} font-medium tracking-wide`}>
              {chip}
            </span>
          )}
          {href && hrefLabel && (
            <a
              href={href}
              className={`text-xs font-medium ${accent.text} flex items-center gap-1 transition-all duration-200 hover:gap-2 ml-auto`}
            >
              {hrefLabel}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      </div>

      {/* hover 시 왼쪽 accent 라인 */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-0.5 ${accent.bg} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top`}
      />
    </div>
  );
};

FeatureCard.propTypes = {
  /** 번호 (numbered variant) */
  number: PropTypes.number,
  /** 이모지 아이콘 */
  icon: PropTypes.string,
  /** 카드 제목 (필수) */
  title: PropTypes.string.isRequired,
  /** 설명 텍스트 (필수) */
  description: PropTypes.string.isRequired,
  /** 하단 칩 텍스트 */
  chip: PropTypes.string,
  /** 레이아웃 variant */
  variant: PropTypes.oneOf(['numbered', 'icon', 'bordered']),
  /** accent 색상 테마 */
  accentColor: PropTypes.oneOf(['ink', 'spine', 'cover']),
  /** 링크 URL */
  href: PropTypes.string,
  /** 링크 레이블 */
  hrefLabel: PropTypes.string,
};

export default FeatureCard;
