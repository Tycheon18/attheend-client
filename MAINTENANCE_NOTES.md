# AttheEnd-Client 유지보수 항목

> 현재 하드코딩된 수치/콘텐츠 중, 추후 실제 데이터로 교체하거나 동적으로 관리해야 할 항목들입니다.

---

## 🗺️ 전체 Phase 로드맵 & 진행 현황

> 최종 목표: Vercel 배포 → 스크린샷 → 크몽 포트폴리오 등록

| Phase | 내용 | 예상 세션 | 상태 |
|-------|------|-----------|------|
| **Phase 1** | SearchBar 리디자인 + 세부 페이지 다크모드 점검 | 1–2세션 | ✅ 완료 |
| **Phase 2** | cafe-landing 업그레이드 (선택) | 1세션 | ✅ 완료 |
| **Phase 3** | Vercel 배포 → 스크린샷 → 크몽 등록 | 1–2세션 | ⏳ 대기 |

### Phase 1 세부 체크리스트

#### 🔍 SearchBar 리디자인 (`src/components/Search/`)
> **2026-03-02 코드 직접 확인 결과 — 이미 완료 상태**
- [x] `SearchBar.js` — CSS Module 완전 삭제, Tailwind B테마 전면 적용 완료
- [x] `SearchBar.module.css` — `/* DELETED */` 처리 완료
- [x] `SortOptions.js` — Tailwind 전면 재작성, ink-500 액센트 탭 UI 완료
- [x] `RecentSearches.js` — Tailwind 전면 재작성, linen/charcoal 토글/드롭다운 완료
- [x] `/search` 페이지에서 SearchBar + RecentSearches + SortOptions 하단 분리 구조 정착

> ✅ **SearchBar 리디자인은 사실상 Phase 1 이전에 이미 완료됨**

#### 🌑 세부 페이지 다크모드 점검
> **2026-03-02 코드 직접 확인 결과 — 하기 항목에 실제 문제 있음**

- [x] `/search` 페이지 (`Search.js`) — B테마 클래스 정상 사용, 특이사항 없음
- [x] `Gallery.js` 페이지 헤더/레이아웃/StatCard — B테마 정상
- [x] **`Gallery.js` `selectCls` — `bg-white`** → `index.css @layer base` 전역 매핑(`.dark .bg-white`)으로 자동 대응 확인, 수정 불필요
- [x] **`ReviewForm.js` `inputCls` — `bg-white`** → 동일, 자동 대응 확인
- [x] **`ReviewContentInput.js` textarea — `bg-white`** → 동일, 자동 대응 확인
- [x] **`Toast.js` 재작성** — CSS Module 제거, Tailwind `dark:` 변형 클래스로 전환 완료
  - success/error/warning/info 각각 `dark:bg-*-950 dark:border-*-800 dark:text-*-200` 적용
  - `Toast.module.css` → `/* DELETED */` 처리 완료
- [x] **`ReviewForm.module.css` 데드코드 제거** — `/* DELETED */` 처리 완료
- [x] `New.js`, `Edit.js` 페이지 래퍼 — B테마 정상, 404 상태도 B테마 적용 확인
- [x] `DARK_MODE_GUIDE.md` 기준 Navbar/ThemeToggle/section-heading — 이미 완료 처리됨

> ✅ **Phase 1 전체 완료 — 2026-03-02**

### Phase 2 세부 체크리스트

> ✅ **2026-03-03 완료**

- [x] `Navbar.jsx` 이식 — `transparent={true}` 히어로 위 투명시작, 스크롤 시 `coffee-800` 변환
- [x] `HeroWithImage.jsx` 이식 — `/images/hero-bg.jpg`, `overlayOpacity=0.55`, `buttonLink="#menu"` smooth scroll
- [x] `ContactForm.jsx` 이식 — react-hook-form 의존성 제거 경량 버전, coffee 팔레트 적용, 예약/문의 특화
- [x] `FooterWithLinks.jsx` 이식 — 기존 footer 교체, coffee-900 다크 푸터
- [x] `App.jsx` 전면 재작성 — 모든 컨텐츠 유지, 4개 컨포넌트 통합
- [x] `FeatureCard` / `MenuCard` 내부 컴포넌트: `flex flex-col` + `flex-grow` + `mt-auto` 펨턴 적용 (키드 업도 균일 정렬)

### Phase 2-B 세부 체크리스트 (portfolio-template, saas-landing)

> ✅ **2026-03-03 완료**

**portfolio-template**
- [x] `Navbar.jsx` 이식 — navy 테마, smooth scroll 내장, framer-motion 로고 애니메이션 제거 대신 컴포넌트
- [x] `ContactForm.jsx` 이식 — react-hook-form 의존성 제거 경량 버전, navy/gold 테마
- [x] `FooterWithLinks.jsx` 이식 — gradient-text 로고, gold hover 적용
- [x] framer-motion Hero/Projects 모달/Skills 유지 — 필살 애니메이션 성능 보존

**saas-landing**
- [x] `Navbar.jsx` 이식 — primary 테마, CTA 버튼 내장, CSS smooth scroll
- [x] `PricingCard.jsx` 이식 — highlighted/badge, 스크롤 트리거 애니메이션 추가
- [x] `Testimonial.jsx` 이식 — **신규 섹션 추가** (SaaS Social Proof), 3개 실사용자 후기
- [x] `CTASection.jsx` 이식 — 스크롤 트리거 수차 애니메이션, secondary 버튼(FAQ) 추가
- [x] `FooterWithLinks.jsx` 이식 — Cloud 아이콘 로고, extraLinks(about/faq) 포함
- [x] FAQ 애코디언 애니메이션: `max-h-0 → max-h-40` CSS 전환으로 개선

---

### Phase 3 세부 체크리스트
- [ ] `npm run build` 확인 (경고/에러 정리)
- [ ] Vercel 배포 설정 (환경변수 `REACT_APP_KAKAO_API_KEY` 포함)
- [ ] 주요 페이지 스크린샷 캡처 (랜딩, 검색, 갤러리, New/Edit — 라이트/다크 각각)
- [ ] 크몽 포트폴리오 텍스트 및 이미지 준비 (AttheEnd 1번 슬롯 — "React + UE5 실사용 프로젝트" 차별화 포인트)
- [ ] 크몽 등록 완료 (서비스 3종: 랜딩페이지, React 컴포넌트, 풀스택)

---

## 📊 랜딩 페이지 스탯 수치 (`src/pages/LandingPage.jsx`)

### Hero Section — 통계 바 (`HeroSection` 컴포넌트 내 stats 배열)

| 위치 | 현재 값 | 교체 기준 |
|------|---------|-----------|
| `도서 데이터베이스` | `200만+` | Kakao Books API 공식 문서 기준 실제 DB 규모 확인 후 업데이트 |
| `독후감 최대 길이` | `2,000자` | `ReviewContentInput.js`의 `MAX_LENGTH = 2000` 상수값과 동기화 ✅ 값 일치 확인됨 |
| `별점 시스템` | `★ 1–5` | 평점 범위 변경 시 수정 |

**권장 처리 방식 (추후):**
- `MAX_LENGTH`는 `src/constants/review.js` 같은 상수 파일로 분리해 단일 소스 관리
- `200만+`는 정적 텍스트이므로 Kakao API 공식 문서 재확인 후 값 수정

---

## 🔍 검색 섹션 빠른 검색 칩 (`QUICK_SEARCHES` 상수)

```js
// src/pages/LandingPage.jsx 상단
const QUICK_SEARCHES = [
  { label: '한강', ... },
  { label: '무라카미 하루키', ... },
  ...
]
```

- 현재 하드코딩된 추천 저자/장르 목록
- 추후 사용자 검색 빈도 데이터 기반으로 동적 구성 가능 (백엔드 연동 시)
- 단기적으로는 분기별 수동 업데이트 권장

---

## 📚 갤러리 프리뷰 더미 데이터 (`PREVIEW_REVIEWS` 상수)

> ✅ **2026-03-03 완료**

- [x] `PREVIEW_REVIEWS` → `PREVIEW_REVIEWS_FALLBACK` 으로 명칭 변경
- [x] `BookStateContext` 연동: 실 데이터 있으면 `createdAt` 내림차순 `.slice(0,3)` 표시, 없으면 Fallback
- [x] `bookToPreview()` 헬퍼: `SPINE_PALETTE` 순환 배정, 날짜 한국어 포맷, `authors[]` 문자열 변환
- [x] 독후감 없을 때 "독후감을 작성하면 여기에 최신 3개가 표시됩니다" 안내 문구 표시

---

## ⚙️ 기술 부채 (참고)

| 항목 | 설명 |
|------|------|
| `react-scripts 5.0.1` | CRA 유지보수 종료 상태. 잔여 취약점 7개는 빌드 도구 내부로 프로덕션 무관. 장기적으로 Vite 마이그레이션 검토 |
| `webpack-dev-server` | 개발 서버 전용 취약점, 프로덕션 빌드 미포함 |

---

## 🔍 SearchBar 리디자인 (`src/components/Search/SearchBar.js`)

> **2026-03-02 코드 직접 확인 결과 — 이미 완료**

### 현재 상태 (실제 코드 기준)
- `SearchBar.js`: CSS Module 완전 삭제, Tailwind B테마 전면 적용 완료
- `SortOptions.js`: Tailwind 전면 재작성, ink-500 토글 탭 UI 완료
- `RecentSearches.js`: Tailwind 전면 재작성, linen/charcoal 토글/드롭다운 완료

### 말미 선택 사항
- LandingPage 빠른검색 칩을 `/search` 페이지에도 노출할지 여부 — Phase 2 이후 팬딩

---

*최종 업데이트: 2026-03-03*
*Gallery Preview 동적화 완료 / 다음: Phase 2 (cafe-landing)*
