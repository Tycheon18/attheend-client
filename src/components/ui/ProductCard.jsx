import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ShoppingCart } from 'lucide-react';

/**
 * ProductCard - 재사용 가능한 상품 카드 컴포넌트
 * 
 * 상품 이미지, 정보, 가격을 표시하는 카드 컴포넌트입니다.
 * 3가지 variant(default, minimal, featured)를 지원합니다.
 */
const ProductCard = ({
  image,
  title,
  description,
  price,
  currency = '₩',
  badge,
  onAddToCart,
  buttonText = '구매하기',
  variant = 'default',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
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
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Variant별 스타일
  const variantStyles = {
    default: {
      card: 'bg-white border border-gray-200 hover:shadow-xl',
      badge: 'bg-blue-500 text-white',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    minimal: {
      card: 'bg-white hover:shadow-lg',
      badge: 'bg-gray-800 text-white',
      button: 'bg-gray-900 hover:bg-gray-800 text-white',
    },
    featured: {
      card: 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 hover:shadow-2xl hover:border-purple-300',
      badge: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      ref={cardRef}
      className={`rounded-lg overflow-hidden transition-all duration-500 flex flex-col ${styles.card} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {/* 이미지 영역 */}
      <div
        className="relative overflow-hidden aspect-square cursor-pointer"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        {/* 뱃지 */}
        {badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase z-10 ${styles.badge}`}>
            {badge}
          </div>
        )}

        {/* 상품 이미지 */}
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isImageHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* 호버 오버레이 (장바구니 아이콘) */}
        {onAddToCart && (
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${
              isImageHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={onAddToCart}
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="장바구니에 담기"
            >
              <ShoppingCart className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* 제목 - 고정 높이 */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2 h-14">
          {title}
        </h3>

        {/* 설명 - 고정 높이 */}
        <div className="mb-4 h-12">
          {description && (
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        {/* 가격 및 버튼 - 항상 하단에 고정 */}
        <div className="flex items-center justify-between mt-auto">
          {/* 가격 */}
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              {currency}{formatPrice(price)}
            </span>
          </div>

          {/* 구매 버튼 */}
          <button
            onClick={onAddToCart}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${styles.button}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes 검증
ProductCard.propTypes = {
  /** 상품 이미지 URL (필수) */
  image: PropTypes.string.isRequired,

  /** 상품명 (필수) */
  title: PropTypes.string.isRequired,

  /** 상품 설명 (선택) */
  description: PropTypes.string,

  /** 가격 (필수) */
  price: PropTypes.number.isRequired,

  /** 통화 기호 (선택, 기본값: '₩') */
  currency: PropTypes.string,

  /** 뱃지 텍스트 (선택, 예: 'NEW', 'SALE') */
  badge: PropTypes.string,

  /** 장바구니 추가 함수 (선택) */
  onAddToCart: PropTypes.func,

  /** 버튼 텍스트 (선택, 기본값: '구매하기') */
  buttonText: PropTypes.string,

  /** 카드 스타일 variant (선택, 기본값: 'default') */
  variant: PropTypes.oneOf(['default', 'minimal', 'featured']),
};

export default ProductCard;

/*
==============================================
사용 예시 1: 기본 스타일
==============================================

import ProductCard from './components/Cards/ProductCard';

function App() {
  const handleAddToCart = () => {
    alert('장바구니에 추가되었습니다!');
  };

  return (
    <ProductCard
      image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
      title="무선 헤드폰"
      description="프리미엄 노이즈 캔슬링 기능"
      price={159000}
      badge="NEW"
      onAddToCart={handleAddToCart}
    />
  );
}


==============================================
사용 예시 2: Minimal 스타일
==============================================

<ProductCard
  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  title="클래식 시계"
  description="타임리스한 디자인"
  price={89000}
  badge="SALE"
  variant="minimal"
  buttonText="바로구매"
  onAddToCart={() => console.log('시계 추가')}
/>


==============================================
사용 예시 3: Featured 스타일 (추천 상품)
==============================================

<ProductCard
  image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"
  title="프리미엄 선글라스"
  description="UV 차단 100% 편광 렌즈"
  price={199000}
  badge="BEST"
  variant="featured"
  buttonText="구매하기"
  currency="₩"
  onAddToCart={() => console.log('선글라스 추가')}
/>


==============================================
사용 예시 4: 그리드 레이아웃 (3열)
==============================================

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <ProductCard
    image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
    title="무선 헤드폰"
    price={159000}
    variant="default"
    onAddToCart={() => {}}
  />
  <ProductCard
    image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
    title="클래식 시계"
    price={89000}
    variant="minimal"
    onAddToCart={() => {}}
  />
  <ProductCard
    image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"
    title="프리미엄 선글라스"
    price={199000}
    badge="BEST"
    variant="featured"
    onAddToCart={() => {}}
  />
</div>


==============================================
사용 예시 5: 버튼 없이 (정보 표시만)
==============================================

<ProductCard
  image="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800"
  title="러닝화"
  description="가볍고 편안한 착화감"
  price={129000}
  variant="minimal"
/>


==============================================
주요 기능
==============================================

✅ 3가지 variant (default, minimal, featured)
✅ 스크롤 트리거 애니메이션
✅ 이미지 hover zoom 효과
✅ 가격 천 단위 콤마 자동 포맷팅
✅ 뱃지 표시 (NEW, SALE, BEST 등)
✅ 반응형 디자인
✅ 장바구니 아이콘 hover 오버레이
✅ 버튼 hover scale 효과
✅ PropTypes 타입 검증
✅ 접근성 (aria-label)
*/
