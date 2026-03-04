import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';

/**
 * CTASection - 재사용 가능한 Call-to-Action 섹션 컴포넌트
 * 
 * 사용자 행동을 유도하는 강조 섹션입니다.
 */
const CTASection = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  backgroundType = 'gradient',
  backgroundImage,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer로 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // 배경 스타일
  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 to-purple-600';
      case 'solid':
        return 'bg-blue-600';
      case 'image':
        return backgroundImage
          ? `bg-cover bg-center`
          : 'bg-gradient-to-r from-blue-600 to-purple-600';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600';
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 px-4 ${getBackgroundStyle()}`}
      style={
        backgroundType === 'image' && backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : {}
      }
    >
      {/* 오버레이 (이미지 배경인 경우) */}
      {backgroundType === 'image' && backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}

      {/* 컨텐츠 */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* 제목 */}
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {title}
        </h2>

        {/* 부제목 */}
        {subtitle && (
          <p
            className={`text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto transition-all duration-800 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            {subtitle}
          </p>
        )}

        {/* 버튼 그룹 */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Primary 버튼 */}
          {primaryButton && (
            <a
              href={primaryButton.href}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {primaryButton.text}
              <ArrowRight className="w-5 h-5" />
            </a>
          )}

          {/* Secondary 버튼 */}
          {secondaryButton && (
            <a
              href={secondaryButton.href}
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {secondaryButton.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

// PropTypes 검증
CTASection.propTypes = {
  /** 메인 제목 (필수) */
  title: PropTypes.string.isRequired,

  /** 부제목 (선택) */
  subtitle: PropTypes.string,

  /** Primary 버튼 정보 (선택) */
  primaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }),

  /** Secondary 버튼 정보 (선택) */
  secondaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }),

  /** 배경 타입 (선택, 기본값: 'gradient') */
  backgroundType: PropTypes.oneOf(['gradient', 'solid', 'image']),

  /** 배경 이미지 URL (backgroundType이 'image'일 때) */
  backgroundImage: PropTypes.string,
};

export default CTASection;

/*
==============================================
사용 예시 1: 기본 사용 (그라데이션 배경)
==============================================

import CTASection from './components/CTA/CTASection';

function App() {
  return (
    <CTASection
      title="지금 바로 시작하세요"
      subtitle="무료 체험으로 먼저 경험해보세요"
      primaryButton={{
        text: '무료 체험하기',
        href: '/signup',
      }}
      secondaryButton={{
        text: '더 알아보기',
        href: '/learn-more',
      }}
    />
  );
}


==============================================
사용 예시 2: 단색 배경 + 1개 버튼
==============================================

<CTASection
  title="특별 할인 진행 중!"
  subtitle="30% 할인된 가격으로 지금 구매하세요"
  primaryButton={{
    text: '구매하기',
    href: '/buy',
  }}
  backgroundType="solid"
/>


==============================================
사용 예시 3: 이미지 배경
==============================================

<CTASection
  title="함께 성장하세요"
  subtitle="5,000명 이상의 사용자가 이미 시작했습니다"
  primaryButton={{
    text: '가입하기',
    href: '/join',
  }}
  backgroundType="image"
  backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920"
/>


==============================================
사용 예시 4: 제목만 (버튼 없음)
==============================================

<CTASection
  title="더 많은 소식을 준비 중입니다"
  subtitle="곧 만나요!"
/>


==============================================
사용 예시 5: 랜딩 페이지 하단 전환 유도
==============================================

<CTASection
  title="준비되셨나요?"
  subtitle="오늘 시작하고 내일 성과를 확인하세요"
  primaryButton={{
    text: '지금 시작하기',
    href: '#contact',
  }}
  secondaryButton={{
    text: '데모 보기',
    href: '#demo',
  }}
  backgroundType="gradient"
/>


==============================================
주요 기능
==============================================

✅ 3가지 배경 타입
  - gradient: 블루→퍼플 그라데이션 (기본)
  - solid: 단색 블루
  - image: 배경 이미지 + 오버레이

✅ 유연한 버튼 구성
  - Primary만
  - Secondary만
  - 둘 다
  - 없음 (제목만)

✅ 스크롤 트리거 애니메이션
  - 제목 → 부제 → 버튼 순차 표시
  - Intersection Observer 사용

✅ 반응형 디자인
  - 모바일: 세로 버튼 배치
  - 데스크톱: 가로 버튼 배치

✅ 버튼 인터랙션
  - Hover: scale-up
  - Active: scale-down
  - Primary: 흰색 배경
  - Secondary: 투명 + 테두리
*/
