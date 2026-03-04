import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Check, Sparkles } from 'lucide-react';

/**
 * PricingCard - 재사용 가능한 가격 플랜 카드 컴포넌트
 * 
 * 가격 플랜을 표시하는 카드 컴포넌트입니다.
 * highlighted prop으로 추천 플랜을 강조할 수 있습니다.
 */
const PricingCard = ({
  plan,
  price,
  period = '월',
  features,
  highlighted = false,
  buttonText = '시작하기',
  onSelect,
  badge,
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

  // 가격 포맷팅 (천 단위 콤마)
  const formatPrice = (value) => {
    if (value === 0) return '무료';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl p-8 transition-all duration-500 flex flex-col ${
        highlighted
          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105 border-2 border-blue-400'
          : 'bg-white text-gray-900 shadow-lg hover:shadow-xl border border-gray-200'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      {/* 뱃지 (highlighted 플랜) */}
      {badge && highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold uppercase flex items-center gap-1 shadow-lg">
            <Sparkles className="w-4 h-4" />
            {badge}
          </div>
        </div>
      )}

      {/* 플랜명 */}
      <h3
        className={`text-2xl font-bold mb-2 ${
          highlighted ? 'text-white' : 'text-gray-900'
        }`}
      >
        {plan}
      </h3>

      {/* 가격 */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          {price === 0 ? (
            <span className="text-5xl font-bold">무료</span>
          ) : (
            <>
              <span className="text-2xl font-semibold">₩</span>
              <span className="text-5xl font-bold">{formatPrice(price)}</span>
              <span
                className={`text-xl ${
                  highlighted ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                /{period}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 기능 목록 */}
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                highlighted
                  ? 'bg-white bg-opacity-20'
                  : 'bg-blue-100'
              }`}
            >
              <Check
                className={`w-4 h-4 ${
                  highlighted ? 'text-white' : 'text-blue-600'
                }`}
              />
            </div>
            <span
              className={`text-sm leading-relaxed ${
                highlighted ? 'text-blue-50' : 'text-gray-600'
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* 선택 버튼 */}
      <button
        onClick={onSelect}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
          highlighted
            ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-lg'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

// PropTypes 검증
PricingCard.propTypes = {
  /** 플랜명 (필수, 예: 'Free', 'Pro', 'Enterprise') */
  plan: PropTypes.string.isRequired,

  /** 가격 (필수, 0이면 '무료' 표시) */
  price: PropTypes.number.isRequired,

  /** 기간 (선택, 기본값: '월') */
  period: PropTypes.string,

  /** 기능 목록 (필수, string 배열) */
  features: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** 추천 플랜 강조 (선택, 기본값: false) */
  highlighted: PropTypes.bool,

  /** 버튼 텍스트 (선택, 기본값: '시작하기') */
  buttonText: PropTypes.string,

  /** 플랜 선택 핸들러 (선택) */
  onSelect: PropTypes.func,

  /** 뱃지 텍스트 (선택, 예: '인기', '추천') */
  badge: PropTypes.string,
};

export default PricingCard;

/*
==============================================
사용 예시 1: 기본 3가지 플랜
==============================================

import PricingCard from './components/Pricing/PricingCard';

function App() {
  const handleSelectPlan = (planName) => {
    console.log(`${planName} 플랜 선택됨`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {/ Free 플랜 /}
      <PricingCard
        plan="Free"
        price={0}
        features={[
          '기본 기능 사용',
          '월 100회 요청',
          '이메일 지원',
          '커뮤니티 액세스',
        ]}
        onSelect={() => handleSelectPlan('Free')}
      />

      {/ Pro 플랜 (추천) /}
      <PricingCard
        plan="Pro"
        price={29000}
        features={[
          '모든 기본 기능',
          '월 무제한 요청',
          '우선 이메일 지원',
          '고급 분석 도구',
          'API 액세스',
          '팀 협업 (5명)',
        ]}
        highlighted={true}
        badge="인기"
        buttonText="무료 체험 시작"
        onSelect={() => handleSelectPlan('Pro')}
      />

      {/ Enterprise 플랜 /}
      <PricingCard
        plan="Enterprise"
        price={99000}
        features={[
          '모든 Pro 기능',
          '무제한 팀원',
          '전담 계정 매니저',
          '24/7 전화 지원',
          '커스텀 통합',
          'SLA 보장',
          '온프레미스 옵션',
        ]}
        buttonText="영업팀 문의"
        onSelect={() => handleSelectPlan('Enterprise')}
      />
    </div>
  );
}


==============================================
사용 예시 2: 연간 플랜
==============================================

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <PricingCard
    plan="Monthly"
    price={29000}
    period="월"
    features={[
      '모든 기능 사용',
      '월별 결제',
      '언제든 취소 가능',
    ]}
    onSelect={() => {}}
  />

  <PricingCard
    plan="Yearly"
    price={290000}
    period="년"
    features={[
      '모든 기능 사용',
      '연간 결제 (2개월 무료)',
      '20% 할인',
    ]}
    highlighted={true}
    badge="최고 가치"
    onSelect={() => {}}
  />
</div>


==============================================
사용 예시 3: 4개 플랜 (Starter 추가)
==============================================

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <PricingCard
    plan="Starter"
    price={0}
    features={['기본 기능', '월 50회 요청']}
    onSelect={() => {}}
  />
  
  <PricingCard
    plan="Basic"
    price={15000}
    features={['월 500회 요청', '이메일 지원']}
    onSelect={() => {}}
  />
  
  <PricingCard
    plan="Pro"
    price={29000}
    features={['무제한 요청', '우선 지원', 'API 액세스']}
    highlighted={true}
    badge="인기"
    onSelect={() => {}}
  />
  
  <PricingCard
    plan="Enterprise"
    price={99000}
    features={['전담 매니저', '24/7 지원', 'SLA']}
    onSelect={() => {}}
  />
</div>


==============================================
사용 예시 4: 실제 결제 연동
==============================================

const handleSelectPlan = async (planName, price) => {
  try {
    // 결제 페이지로 이동 또는 모달 열기
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: planName, price }),
    });
    
    const { checkoutUrl } = await response.json();
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('결제 오류:', error);
  }
};

<PricingCard
  plan="Pro"
  price={29000}
  features={[...]}
  onSelect={() => handleSelectPlan('Pro', 29000)}
/>


==============================================
사용 예시 5: 커스텀 섹션
==============================================

<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
  <div className="max-w-7xl mx-auto px-4">
    {/ 제목 /}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        요금제 선택
      </h2>
      <p className="text-xl text-gray-600">
        비즈니스에 맞는 플랜을 선택하세요
      </p>
    </div>

    {/ 플랜 카드들 /}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <PricingCard {...} />
      <PricingCard {...} />
      <PricingCard {...} />
    </div>
  </div>
</section>


==============================================
주요 기능
==============================================

✅ 추천 플랜 강조 (highlighted)
  - 그라데이션 배경 (블루→퍼플)
  - scale-105로 살짝 크게
  - 그림자 강조
  - 흰색 버튼

✅ 뱃지 표시 (상단)
  - "인기", "추천", "최고 가치" 등
  - 골드 그라데이션
  - Sparkles 아이콘

✅ 가격 포맷팅
  - 0원 → "무료" 표시
  - 천 단위 콤마 자동 삽입

✅ 기능 목록
  - 체크 아이콘
  - 읽기 쉬운 간격

✅ 스크롤 트리거 애니메이션
✅ 버튼 hover/active 효과
✅ 반응형 디자인
✅ PropTypes 타입 검증
*/
