import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Mail, User, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';

/**
 * ContactForm - 재사용 가능한 연락 폼 컴포넌트
 * 
 * react-hook-form을 사용한 폼 관리와 유효성 검사를 제공합니다.
 * 스크롤 트리거 애니메이션과 제출 성공 피드백을 지원합니다.
 */
const ContactForm = ({
  onSubmit,
  title = '문의하기',
  submitButtonText = '전송하기',
  showPhone = false,
  layout = 'vertical',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange', // 실시간 유효성 검사
  });

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

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  // 폼 제출 핸들러
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // onSubmit prop 실행
      await onSubmit(data);

      // 성공 상태 표시
      setIsSuccess(true);

      // 2초 후 폼 초기화
      setTimeout(() => {
        reset();
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 레이아웃 클래스
  const layoutClasses = {
    vertical: 'flex flex-col gap-5',
    horizontal: 'grid grid-cols-1 md:grid-cols-2 gap-5',
  };

  return (
    <div
      ref={formRef}
      className={`w-full max-w-2xl mx-auto transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {/* 제목 */}
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>
      )}

      {/* 성공 메시지 */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-800 font-medium">
            메시지가 성공적으로 전송되었습니다!
          </p>
        </div>
      )}

      {/* 폼 */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg"
      >
        <div className={layoutClasses[layout]}>
          {/* 이름 필드 */}
          <div className={layout === 'horizontal' ? 'md:col-span-1' : ''}>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              이름 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: '이름을 입력해주세요',
                  minLength: {
                    value: 2,
                    message: '이름은 최소 2자 이상이어야 합니다',
                  },
                  maxLength: {
                    value: 50,
                    message: '이름은 최대 50자까지 입력 가능합니다',
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="홍길동"
                aria-label="이름"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* 이메일 필드 */}
          <div className={layout === 'horizontal' ? 'md:col-span-1' : ''}>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식을 입력해주세요',
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="example@email.com"
                aria-label="이메일"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* 전화번호 필드 (선택) */}
          {showPhone && (
            <div className={layout === 'horizontal' ? 'md:col-span-2' : ''}>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                전화번호
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="phone"
                  type="tel"
                  {...register('phone', {
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: '숫자와 하이픈(-)만 입력 가능합니다',
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="010-1234-5678"
                  aria-label="전화번호"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          )}

          {/* 메시지 필드 */}
          <div className={layout === 'horizontal' ? 'md:col-span-2' : ''}>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              메시지 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="message"
                rows={5}
                {...register('message', {
                  required: '메시지를 입력해주세요',
                  minLength: {
                    value: 10,
                    message: '메시지는 최소 10자 이상이어야 합니다',
                  },
                  maxLength: {
                    value: 500,
                    message: '메시지는 최대 500자까지 입력 가능합니다',
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.message
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
                placeholder="문의하실 내용을 입력해주세요..."
                aria-label="메시지"
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
            isSubmitting || isSuccess
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>전송 중...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>전송 완료!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>{submitButtonText}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// PropTypes 검증
ContactForm.propTypes = {
  /** 폼 제출 핸들러 (필수) */
  onSubmit: PropTypes.func.isRequired,

  /** 폼 제목 (선택, 기본값: '문의하기') */
  title: PropTypes.string,

  /** 제출 버튼 텍스트 (선택, 기본값: '전송하기') */
  submitButtonText: PropTypes.string,

  /** 전화번호 필드 표시 여부 (선택, 기본값: false) */
  showPhone: PropTypes.bool,

  /** 레이아웃 (선택, 기본값: 'vertical') */
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default ContactForm;

/*
==============================================
사용 예시 1: 기본 사용
==============================================

import ContactForm from './components/Forms/ContactForm';

function App() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // API 호출 등
  };

  return (
    <ContactForm
      onSubmit={handleSubmit}
    />
  );
}


==============================================
사용 예시 2: 전화번호 필드 포함
==============================================

<ContactForm
  onSubmit={handleSubmit}
  title="고객 지원"
  submitButtonText="문의 보내기"
  showPhone={true}
/>


==============================================
사용 예시 3: 가로 레이아웃
==============================================

<ContactForm
  onSubmit={async (data) => {
    // API 호출 예시
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }}
  title="파트너십 문의"
  layout="horizontal"
  showPhone={true}
/>


==============================================
사용 예시 4: 커스텀 섹션에 포함
==============================================

<section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
  <div className="container mx-auto px-4">
    <ContactForm
      onSubmit={handleSubmit}
      title="프로젝트 상담"
      submitButtonText="상담 신청"
      showPhone={true}
      layout="horizontal"
    />
  </div>
</section>


==============================================
사용 예시 5: Alert 대신 실제 API 호출
==============================================

const handleContactSubmit = async (data) => {
  try {
    const response = await fetch('https://api.example.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('전송 실패');
    }
    
    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
    alert('전송 중 오류가 발생했습니다.');
  }
};

<ContactForm onSubmit={handleContactSubmit} />


==============================================
주요 기능
==============================================

✅ react-hook-form 기반 폼 관리
✅ 실시간 유효성 검사
✅ 에러 메시지 표시 (한글)
✅ 제출 버튼 로딩 상태
✅ 제출 성공 피드백
✅ 자동 폼 초기화 (2초 후)
✅ 스크롤 트리거 애니메이션
✅ 2가지 레이아웃 (vertical/horizontal)
✅ 전화번호 필드 선택 옵션
✅ 접근성 (aria-label, label 연결)
✅ 반응형 디자인
✅ Lucide 아이콘 통합
*/
