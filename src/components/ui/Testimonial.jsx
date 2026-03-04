import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Star, Quote } from 'lucide-react';

/**
 * Testimonial - 재사용 가능한 고객 후기 컴포넌트
 * 
 * 고객 리뷰를 표시하는 카드 컴포넌트입니다.
 */
const Testimonial = ({
  quote,
  author,
  role,
  company,
  avatar,
  rating = 5,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

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
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // 별점 렌더링
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      ref={cardRef}
      className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {/* 인용 아이콘 */}
      <div className="absolute top-4 right-4 text-blue-100">
        <Quote className="w-12 h-12" />
      </div>

      {/* 별점 */}
      <div className="flex gap-1 mb-4">{renderStars()}</div>

      {/* 후기 내용 */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
        "{quote}"
      </p>

      {/* 작성자 정보 */}
      <div className="flex items-center gap-4">
        {/* 아바타 */}
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xl font-bold">
            {author.charAt(0)}
          </div>
        )}

        {/* 이름 및 직책 */}
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-600">
            {role}
            {company && ` at ${company}`}
          </p>
        </div>
      </div>
    </div>
  );
};

// PropTypes 검증
Testimonial.propTypes = {
  /** 후기 내용 (필수) */
  quote: PropTypes.string.isRequired,

  /** 작성자 이름 (필수) */
  author: PropTypes.string.isRequired,

  /** 작성자 직책 (필수) */
  role: PropTypes.string.isRequired,

  /** 회사명 (선택) */
  company: PropTypes.string,

  /** 아바타 이미지 URL (선택) */
  avatar: PropTypes.string,

  /** 별점 (선택, 기본값: 5, 1-5) */
  rating: PropTypes.number,
};

export default Testimonial;

/*
==============================================
사용 예시 1: 기본 사용
==============================================

import Testimonial from './components/Testimonial/Testimonial';

function App() {
  return (
    <Testimonial
      quote="정말 훌륭한 서비스입니다! 우리 팀의 생산성이 2배 향상되었습니다."
      author="홍길동"
      role="CEO"
      company="ABC Company"
      avatar="https://randomuser.me/api/portraits/men/1.jpg"
      rating={5}
    />
  );
}


==============================================
사용 예시 2: 아바타 없이 (이니셜 표시)
==============================================

<Testimonial
  quote="고객 지원이 정말 빠르고 친절합니다."
  author="김영희"
  role="마케팅 매니저"
  company="XYZ Corp"
  rating={5}
/>


==============================================
사용 예시 3: 회사명 없이
==============================================

<Testimonial
  quote="사용하기 정말 편리해요!"
  author="이철수"
  role="프리랜서 디자이너"
  rating={4}
/>


==============================================
사용 예시 4: 그리드 레이아웃
==============================================

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <Testimonial
    quote="게임 체인저입니다!"
    author="박민수"
    role="CTO"
    company="Tech Startup"
    rating={5}
  />
  
  <Testimonial
    quote="강력 추천합니다."
    author="정수진"
    role="Product Manager"
    rating={5}
  />
  
  <Testimonial
    quote="최고의 선택이었습니다."
    author="최동욱"
    role="CEO"
    company="Design Studio"
    rating={5}
  />
</div>


==============================================
사용 예시 5: 섹션으로 감싸기
==============================================

<section className="py-16 px-4 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">
      고객 후기
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Testimonial {...} />
      <Testimonial {...} />
      <Testimonial {...} />
    </div>
  </div>
</section>


==============================================
주요 기능
==============================================

✅ 별점 시스템
  - 1-5점 표시
  - 노란색 채워진 별
  - 회색 빈 별

✅ 프로필
  - 아바타 이미지 (있으면 표시)
  - 없으면 이니셜 (그라데이션 배경)
  - 이름, 직책, 회사명

✅ 디자인
  - 깔끔한 화이트 카드
  - 인용 아이콘 (상단 우측)
  - 그림자 효과
  - Hover 시 그림자 강화

✅ 스크롤 애니메이션
  - Intersection Observer
  - fade-in + slide-up

✅ 반응형
  - 그리드 레이아웃 권장
  - 모바일: 1열
  - 태블릿: 2열
  - 데스크톱: 3열
*/
