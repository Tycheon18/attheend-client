import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Github, Twitter, Linkedin, Instagram, Facebook, Mail } from 'lucide-react';

/**
 * FooterWithLinks - 재사용 가능한 푸터 컴포넌트
 * 
 * 링크 그룹, SNS 아이콘, 뉴스레터 구독 폼을 포함하는 푸터입니다.
 * 4열 그리드 레이아웃을 사용하며 반응형을 지원합니다.
 */
const FooterWithLinks = ({
  companyName,
  description,
  links,
  socialLinks = [],
  copyright,
  showNewsletter = false,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // SNS 아이콘 매핑
  const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
  };

  // 뉴스레터 구독 핸들러
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubscribing(true);

    // 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubscribing(false);
      setEmail('');

      // 3초 후 성공 메시지 초기화
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* 메인 푸터 영역 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 회사 소개 */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">{companyName}</h3>
            {description && (
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {description}
              </p>
            )}
          </div>

          {/* 링크 그룹들 */}
          {links.map((group, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 뉴스레터 (선택) */}
          {showNewsletter && (
            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-4">뉴스레터 구독</h4>
              <p className="text-sm text-gray-400 mb-4">
                최신 소식을 이메일로 받아보세요
              </p>

              {/* 성공 메시지 */}
              {isSuccess && (
                <div className="mb-4 p-3 bg-green-500 bg-opacity-20 border border-green-500 rounded text-green-400 text-sm">
                  구독이 완료되었습니다!
                </div>
              )}

              {/* 구독 폼 */}
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 입력"
                    className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing || isSuccess}
                  className={`px-4 py-2 rounded font-medium text-sm transition-all duration-200 ${
                    isSubscribing || isSuccess
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubscribing ? '...' : '구독'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* 하단 영역 (저작권 + SNS) */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* 저작권 */}
            <p className="text-sm text-gray-500">
              {copyright || `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`}
            </p>

            {/* SNS 아이콘 */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = socialIcons[social.platform.toLowerCase()];
                  return Icon ? (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={social.platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

// PropTypes 검증
FooterWithLinks.propTypes = {
  /** 회사명 (필수) */
  companyName: PropTypes.string.isRequired,

  /** 회사 소개 (선택) */
  description: PropTypes.string,

  /** 링크 그룹 배열 (필수) */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,

  /** SNS 링크 배열 (선택) */
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.oneOf(['github', 'twitter', 'linkedin', 'instagram', 'facebook'])
        .isRequired,
      href: PropTypes.string.isRequired,
    })
  ),

  /** 저작권 텍스트 (선택) */
  copyright: PropTypes.string,

  /** 뉴스레터 구독 폼 표시 여부 (선택, 기본값: false) */
  showNewsletter: PropTypes.bool,
};

export default FooterWithLinks;

/*
==============================================
사용 예시 1: 기본 사용
==============================================

import FooterWithLinks from './components/Footer/FooterWithLinks';

function App() {
  return (
    <>
      {/ 페이지 컨텐츠 /}
      
      <FooterWithLinks
        companyName="React Components Pack"
        description="프리미엄 재사용 가능 컴포넌트 라이브러리"
        links={[
          {
            title: '서비스',
            items: [
              { label: '기능', href: '#features' },
              { label: '가격', href: '#pricing' },
              { label: '고객사례', href: '#cases' },
            ],
          },
          {
            title: '회사',
            items: [
              { label: '소개', href: '#about' },
              { label: '블로그', href: '#blog' },
              { label: '채용', href: '#careers' },
            ],
          },
          {
            title: '고객지원',
            items: [
              { label: '문의하기', href: '#contact' },
              { label: 'FAQ', href: '#faq' },
              { label: '문서', href: '#docs' },
            ],
          },
        ]}
        socialLinks={[
          { platform: 'github', href: 'https://github.com/yourcompany' },
          { platform: 'twitter', href: 'https://twitter.com/yourcompany' },
          { platform: 'linkedin', href: 'https://linkedin.com/company/yourcompany' },
        ]}
      />
    </>
  );
}


==============================================
사용 예시 2: 뉴스레터 포함
==============================================

<FooterWithLinks
  companyName="My SaaS"
  description="혁신적인 비즈니스 솔루션"
  links={[
    {
      title: '제품',
      items: [
        { label: '기능', href: '/features' },
        { label: '가격', href: '/pricing' },
      ],
    },
    {
      title: '지원',
      items: [
        { label: '문의', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
  ]}
  socialLinks={[
    { platform: 'twitter', href: '#' },
    { platform: 'linkedin', href: '#' },
  ]}
  showNewsletter={true}
/>


==============================================
사용 예시 3: 커스텀 저작권
==============================================

<FooterWithLinks
  companyName="ACME Corp"
  links={[...]}
  copyright="© 2024 ACME Corp. 모든 권리 보유. | 개인정보처리방침 | 이용약관"
/>


==============================================
사용 예시 4: 최소 구성 (링크만)
==============================================

<FooterWithLinks
  companyName="Simple Co."
  links={[
    {
      title: '메뉴',
      items: [
        { label: '홈', href: '/' },
        { label: '소개', href: '/about' },
        { label: '문의', href: '/contact' },
      ],
    },
  ]}
/>


==============================================
사용 예시 5: 풀 옵션
==============================================

<FooterWithLinks
  companyName="Tech Startup"
  description="AI 기반 혁신적인 솔루션을 제공하는 테크 스타트업입니다."
  links={[
    {
      title: '제품',
      items: [
        { label: '기능', href: '/features' },
        { label: '가격', href: '/pricing' },
        { label: '통합', href: '/integrations' },
        { label: 'API', href: '/api' },
      ],
    },
    {
      title: '회사',
      items: [
        { label: '소개', href: '/about' },
        { label: '팀', href: '/team' },
        { label: '블로그', href: '/blog' },
        { label: '채용', href: '/careers' },
      ],
    },
    {
      title: '리소스',
      items: [
        { label: '문서', href: '/docs' },
        { label: '가이드', href: '/guides' },
        { label: '튜토리얼', href: '/tutorials' },
        { label: '커뮤니티', href: '/community' },
      ],
    },
  ]}
  socialLinks={[
    { platform: 'github', href: 'https://github.com' },
    { platform: 'twitter', href: 'https://twitter.com' },
    { platform: 'linkedin', href: 'https://linkedin.com' },
    { platform: 'instagram', href: 'https://instagram.com' },
    { platform: 'facebook', href: 'https://facebook.com' },
  ]}
  showNewsletter={true}
  copyright="© 2024 Tech Startup. All rights reserved. Privacy Policy | Terms of Service"
/>


==============================================
주요 기능
==============================================

✅ 4열 그리드 레이아웃 (반응형)
  - 모바일: 1열
  - 태블릿: 2열
  - 데스크톱: 4열

✅ 회사 정보
  - 회사명 (크고 굵게)
  - 소개 문구 (선택)

✅ 링크 그룹 (여러 개)
  - 그룹 제목
  - 링크 목록
  - Hover 시 흰색으로 변경

✅ SNS 아이콘 (5개 지원)
  - GitHub
  - Twitter
  - LinkedIn
  - Instagram
  - Facebook

✅ 뉴스레터 구독 (선택)
  - 이메일 입력
  - 제출 버튼
  - 로딩 상태
  - 성공 메시지

✅ 하단 영역
  - 저작권 정보
  - SNS 아이콘 배치

✅ 다크 테마 (회색 계열)
✅ PropTypes 타입 검증
✅ 접근성 (aria-label)
*/
