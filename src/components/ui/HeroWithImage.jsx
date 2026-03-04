import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * HeroWithImage - 재사용 가능한 Hero 섹션 컴포넌트
 * 
 * 배경 이미지 위에 다크 오버레이와 콘텐츠를 표시합니다.
 * 반응형 디자인과 스크롤 트리거 애니메이션을 지원합니다.
 */
const HeroWithImage = ({
  title,
  subtitle,
  buttonText,
  buttonLink = '#',
  backgroundImage,
  overlayOpacity = 0.5,
  textAlign = 'center',
  height = 'screen',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

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
        threshold: 0.2, // 20% 보이면 트리거
        rootMargin: '0px',
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // 높이 클래스 매핑
  const heightClasses = {
    screen: 'h-screen',
    lg: 'h-[600px]',
    md: 'h-[400px]',
  };

  // 텍스트 정렬 클래스 매핑
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <section
      ref={heroRef}
      className={`relative ${heightClasses[height]} w-full overflow-hidden`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 다크 오버레이 */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />

      {/* 콘텐츠 컨테이너 */}
      <div className={`relative z-10 flex flex-col justify-center ${alignClasses[textAlign]} h-full px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-7xl w-full ${textAlign === 'center' ? 'mx-auto' : textAlign === 'right' ? 'ml-auto' : ''}`}>
          {/* 메인 제목 - Fade-in 애니메이션 */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            {title}
          </h1>

          {/* 부제목 */}
          {subtitle && (
            <p className={`text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl transition-all duration-800 delay-200 ${
              textAlign === 'center' ? 'mx-auto' : textAlign === 'right' ? 'ml-auto' : ''
            } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {subtitle}
            </p>
          )}

          {/* CTA 버튼 */}
          {buttonText && (
            <div className={`transition-all duration-800 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <a
                href={buttonLink}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 ease-in-out hover:shadow-2xl"
              >
                {buttonText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// PropTypes 검증
HeroWithImage.propTypes = {
  /** 메인 제목 (필수) */
  title: PropTypes.string.isRequired,
  
  /** 부제목 (선택) */
  subtitle: PropTypes.string,
  
  /** CTA 버튼 텍스트 (선택) */
  buttonText: PropTypes.string,
  
  /** 버튼 링크 (선택, 기본값: '#') */
  buttonLink: PropTypes.string,
  
  /** 배경 이미지 URL (선택) */
  backgroundImage: PropTypes.string,
  
  /** 오버레이 투명도 0-1 사이 (선택, 기본값: 0.5) */
  overlayOpacity: PropTypes.number,
  
  /** 텍스트 정렬 (선택, 기본값: 'center') */
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  
  /** Hero 섹션 높이 (선택, 기본값: 'screen') */
  height: PropTypes.oneOf(['screen', 'lg', 'md']),
};

export default HeroWithImage;

/*
==============================================
사용 예시 1: 기본 사용 (전체 화면)
==============================================

import HeroWithImage from './components/Hero/HeroWithImage';

function App() {
  return (
    <HeroWithImage
      title="Welcome to Our Website"
      subtitle="We create amazing experiences"
      buttonText="Get Started"
      buttonLink="/signup"
      backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920"
    />
  );
}


==============================================
사용 예시 2: 왼쪽 정렬 + 중간 높이
==============================================

<HeroWithImage
  title="Transform Your Business"
  subtitle="Innovative solutions for modern challenges"
  buttonText="Learn More"
  buttonLink="/solutions"
  backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920"
  textAlign="left"
  height="lg"
  overlayOpacity={0.6}
/>


==============================================
사용 예시 3: 버튼 없이 (정보 전달용)
==============================================

<HeroWithImage
  title="Our Story"
  subtitle="Building the future, one step at a time"
  backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920"
  height="md"
  overlayOpacity={0.7}
/>


==============================================
사용 예시 4: 배경 없이 (단색 배경)
==============================================

<div className="bg-gradient-to-r from-blue-500 to-purple-600">
  <HeroWithImage
    title="Join Our Community"
    subtitle="Connect with thousands of creators worldwide"
    buttonText="Sign Up Free"
    buttonLink="/register"
    overlayOpacity={0}
    height="lg"
  />
</div>


==============================================
사용 예시 5: 오른쪽 정렬 + 강한 오버레이
==============================================

<HeroWithImage
  title="Premium Quality"
  subtitle="Crafted with attention to detail"
  buttonText="Shop Now"
  buttonLink="/shop"
  backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920"
  textAlign="right"
  overlayOpacity={0.8}
/>


==============================================
주요 기능
==============================================

✅ 스크롤 트리거 애니메이션 (Intersection Observer)
✅ 반응형 디자인
✅ 8가지 커스터마이징 가능한 Props
✅ 텍스트 정렬 옵션 (left/center/right)
✅ 다양한 높이 옵션 (screen/lg/md)
✅ 조절 가능한 오버레이 투명도
✅ 부드러운 스크롤 네비게이션
✅ PropTypes 타입 검증
*/
