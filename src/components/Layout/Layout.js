import React from 'react';
import { Link } from 'react-router-dom';
import { Search, BookMarked, PenLine } from 'lucide-react';

import Navbar from '../ui/Navbar';
import FooterWithLinks from '../ui/FooterWithLinks';
import ThemeToggle from '../Common/ThemeToggle';
import styles from './Layout.module.css';

// ─── Navbar 로고 ───────────────────────────────────────────────
const NavLogo = () => (
  <Link to="/" className="flex flex-col leading-tight hover:opacity-80 transition-opacity">
    <span className="font-serif text-lg font-bold tracking-tight text-charcoal-900">
      At the End of the Shelf
    </span>
    <span className="text-xs tracking-widest uppercase opacity-40 font-sans font-light text-charcoal-700">
      A Working Library
    </span>
  </Link>
);

// ─── Navbar 우측 슬롯 ──────────────────────────────────────────
const NavRight = () => (
  <ThemeToggle />
);

// ─── 공유 nav 링크
// 독후감 작성을 포함한 3개 링크를 한 곳에서 관리합니다.
// icon / description은 Navbar의 호버 카드에서 사용됩니다.
// ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  {
    label: '도서 검색',
    href: '/search',
    icon: Search,
    description: 'Kakao API 기반 200만+ 도서 검색',
  },
  {
    label: '내 갤러리',
    href: '/gallery',
    icon: BookMarked,
    description: '작성한 독후감을 한눈에 모아보기',
  },
  {
    label: '독후감 작성',
    href: '/new',
    icon: PenLine,
    description: '새 독후감을 기록하고 별점을 남기기',
  },
];

// ─── Footer 링크 ───────────────────────────────────────────────
const FOOTER_LINKS = [
  {
    title: '사이트',
    items: [
      { label: '도서 검색',  href: '/search' },
      { label: '내 갤러리',  href: '/gallery' },
      { label: '독후감 작성', href: '/new' },
    ],
  },
  {
    title: '프로젝트',
    items: [
      { label: 'GitHub',      href: 'https://github.com' },
      { label: 'UE5 클라이언트', href: '#' },
      { label: 'API 서버',    href: '#' },
    ],
  },
  {
    title: '문서',
    items: [
      { label: '개발 가이드',    href: '#' },
      { label: 'API 레퍼런스', href: '#' },
      { label: '로드맵',        href: '#' },
    ],
  },
];

// ─── Layout ────────────────────────────────────────────────────
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>

      {/* B테마 Navbar — sticky, ThemeToggle */}
      <Navbar
        logo={<NavLogo />}
        links={NAV_LINKS}
        sticky={true}
        transparent={false}
        rightContent={<NavRight />}
      />

      {/* 세부 페이지 콘텐츠 영역 */}
      <main className={styles.main}>
        {children}
      </main>

      {/* B테마 Footer */}
      <FooterWithLinks
        companyName="At the End of the Shelf"
        description={`책장 끝에서 만나는 나만의 독서 기록 공간.\nKakao Books API와 Unreal Engine 5로\n구현하는 독서 관리 & 3D 도서관.`}
        links={FOOTER_LINKS}
        socialLinks={[
          { platform: 'github', href: 'https://github.com' },
        ]}
        copyright="© 2026 At the End of the Shelf. React 19 + Express + Kakao API + UE5"
      />
    </div>
  );
};

export default Layout;
