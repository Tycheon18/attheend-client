# 컴포넌트 리뷰 체크리스트

> Phase 1 리메이크 전체 과정에서 반복적으로 발견·수정된 패턴을 정리한 소프트 템플릿입니다.
> 새 컴포넌트 작성 시, 기존 컴포넌트 리뷰 시, 다음 세션 인계 시 반드시 참고하세요.

---

## 🔴 최우선 — 반복 지적 패턴

### 1. 텍스트 길이 변화에 따른 레이아웃 이동 (Layout Shift)

> **"이 부분은 공통적으로 계속 지적되는 사항이네. 적용 가능한 읽기 파일을 만들어서 관리하는 게 좋겠어."**

**증상**: 상태 전환(다크↔라이트, 선택값 변경 등)에서 텍스트 글자 수가 달라지면 주변 요소 위치가 흔들림.

**발견된 위치**
- `ThemeToggle.js` — '다크'(2자) ↔ '라이트'(3자) 전환 시 Navbar 우측 슬롯 밀림
- `Navbar.jsx` 호버 카드 — 설명 텍스트 길이에 따라 두 줄로 넘어감

**해결 원칙**: 텍스트가 들어갈 공간을 **항상 고정 크기**로 예약한다.

```jsx
// ❌ 텍스트 길이에 따라 버튼 너비가 변함
<button>{isDark ? '라이트' : '다크'}</button>

// ✅ inline-block + 고정 너비로 텍스트 영역 예약
<button>
  <span className="inline-block w-10 text-left">
    {isDark ? '라이트' : '다크'}
  </span>
</button>
```

```jsx
// ❌ 호버 카드 너비가 콘텐츠에 따라 달라짐 → 설명 두 줄 넘어감
<div className="w-52">...</div>

// ✅ 설명 텍스트가 한 줄에 들어올 수 있는 충분한 너비 확보
<div className="w-60">...</div>
```

**점검 기준**
```
[ ] 상태에 따라 텍스트가 바뀌는 모든 요소에 고정 너비 wrapper가 있는가?
[ ] 드롭다운/팝오버 카드에 min-width 또는 고정 w-* 가 설정되어 있는가?
[ ] 한 줄 유지가 필요한 설명 텍스트에 whitespace-nowrap 또는 충분한 너비가 있는가?
```

---

### 2. 카드 내 콘텐츠 양에 따른 레이아웃 불균형

> **"FeatureCard와 ReviewCard가 콘텐츠 줄 수에 따라 하단 설명용 문자들의 위치가 고르지 못한 경우가 있어. 콘텐츠가 차지할 공간을 일정하게 만들어줘."**

**증상**: 카드 목록에서 텍스트가 짧은 카드는 하단 버튼·메타정보가 위로 올라오고, 텍스트가 긴 카드는 아래쪽으로 내려가 정렬이 맞지 않음.

**해결 원칙**: 카드를 `flex flex-col`로 만들고, 가변 영역(제목·설명)에 `flex-grow`를 부여해 하단 요소를 항상 카드 바닥에 고정한다.

```jsx
// ✅ 카드 레이아웃 기본 구조
<div className="flex flex-col h-full">
  {/* 상단 고정: 이미지, 아이콘 등 */}
  <div className="flex-shrink-0">...</div>

  {/* 가변 영역: 제목 + 설명 — 이 영역이 늘어나며 하단을 아래로 밀어냄 */}
  <div className="flex-grow">
    <h3>...</h3>
    <p>...</p>
  </div>

  {/* 하단 고정: 버튼, 날짜, 태그 등 — 항상 카드 바닥에 위치 */}
  <div className="flex-shrink-0 mt-auto">
    <button>...</button>
  </div>
</div>
```

**점검 기준**
```
[ ] 카드가 flex flex-col + h-full 구조인가?
[ ] 가변 콘텐츠(제목/설명) 영역에 flex-grow가 있는가?
[ ] 하단 요소(버튼/날짜/메타)가 mt-auto 또는 flex-shrink-0으로 고정되는가?
[ ] 카드 리스트 컨테이너가 items-stretch 또는 동일 높이를 강제하는가?
```

---

### 3. Navbar 레이아웃 — sticky vs fixed 혼동

> **"글자가 navbar에 가려져서 다 안 보이는데? 페이지 레이아웃이 navbar / main / footer 순이 아니라 main 위에 navbar를 올려둔 거야?"**

**증상**: `position: fixed` 사용 시 Navbar가 문서 흐름에서 빠져나와 페이지 첫 콘텐츠가 Navbar 뒤에 숨음.

**이 프로젝트의 규칙**:
- Navbar → `position: sticky; top: 0` (문서 흐름 유지, 별도 padding-top 불필요)
- Layout 구조: `<Navbar> → <main> → <FooterWithLinks>` 순서로 자연스럽게 쌓임

```jsx
// ❌ fixed는 문서 흐름에서 빠짐 → 콘텐츠가 Navbar 뒤에 숨음
<nav className="fixed top-0 w-full z-50">...</nav>
<main className="pt-16">...</main>  // padding-top으로 억지로 밀어내야 함

// ✅ sticky는 흐름 유지 — padding-top 없이도 자연스럽게 배치
<nav className="sticky top-0 z-50">...</nav>
<main>...</main>
```

**점검 기준**
```
[ ] Navbar가 position sticky인가? (fixed 사용 금지)
[ ] <main>에 Navbar 높이만큼의 padding-top이 없는가?
[ ] 페이지 스크롤 시 Navbar가 화면 상단에 고정되는가?
```

---

### 4. 네이티브 select 요소 커스텀 스타일링

> **"SearchBar의 카테고리 선택 부분이 너무 타이트해 보이거든? rightborder의 위치를 살짝 떨어뜨려놓으면 좋겠어. 화살표와 right-border 선의 간격이 너무 좁다."**

**증상**: 브라우저 기본 select의 드롭다운 화살표 위치를 padding으로 조정할 수 없어, 오른쪽 구분선(border)과 화살표가 붙어 보임.

**해결 원칙**: `appearance-none`으로 네이티브 화살표를 제거하고, `pointer-events-none` SVG 화살표를 절대 위치로 직접 배치한다.

```jsx
// ✅ 커스텀 select + 구분선 패턴
<div className="relative flex-shrink-0" style={{ borderRight: '1px solid #D8D2C8' }}>
  {/* appearance-none: 네이티브 화살표 제거 | pr-9: SVG 화살표 공간 확보 */}
  <select className="appearance-none bg-transparent border-none pl-4 pr-9 outline-none cursor-pointer h-full">
    {options.map(opt => <option key={opt}>{opt}</option>)}
  </select>

  {/* 커스텀 화살표: right-3으로 구분선과 간격 확보 */}
  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-500">
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd" />
    </svg>
  </span>
</div>
```

**핵심 포인트**
- 구분선(divider)은 wrapper `div`의 `borderRight`으로 — select 자체의 `border`가 아님
- SVG 화살표 `right-3` (12px) → 구분선과 자연스러운 간격 형성
- `pointer-events-none` 필수 — SVG가 select 클릭을 막지 않도록

**점검 기준**
```
[ ] 네이티브 select에 appearance-none이 적용되었는가?
[ ] 커스텀 화살표가 pointer-events-none으로 클릭 통과되는가?
[ ] 화살표와 구분선 사이에 충분한 간격(right-3 이상)이 있는가?
[ ] 다크모드에서 화살표 색상이 올바르게 전환되는가?
```

---

### 5. `bg-white` 하드코딩 — 다크모드 누락

**증상**: 다크모드 전환 시 특정 요소만 흰색으로 남아 있음.

**발견된 위치**: `Gallery.js selectCls`, `ReviewForm.js inputCls`, `ReviewContentInput.js textarea`

```jsx
// ❌ 다크모드에서 흰색 그대로
className="... bg-white ..."

// ✅ CSS 변수 사용 (index.css .dark 블록에서 자동 전환)
style={{ backgroundColor: 'var(--color-surface)' }}

// ✅ 또는 Tailwind dark: 변형 명시
className="... bg-white dark:bg-[#1C1C1C] ..."
```

> **참고**: `index.css`의 전역 규칙(`.dark .bg-white { background-color: #1C1C1C; }`)으로
> 일반 Tailwind `bg-white`는 자동 대응되지만, **인라인 style이나 CSS Module** 내 `bg-white`는
> 이 규칙이 적용되지 않아 누락됩니다.

---

### 6. 다크모드에서 텍스트 색상 미전환

> **"다크모드를 적용하니 검은색 글자의 색이 그대로여서 글자가 안 보이네."**

**증상**: 라이트모드에서 `text-charcoal-900`이나 검정 계열 텍스트가 다크모드에서도 그대로 남아 배경색과 구분이 안 됨.

**이 프로젝트의 규칙** — `index.css @layer base` 전역 매핑:
```
text-charcoal-900 → 다크모드에서 자동으로 밝은 색으로 전환
text-charcoal-700 → 동일
text-charcoal-500 → 동일
```

**주의**: 인라인 `style={{ color: '#1A1A1A' }}` 같은 하드코딩 색상은 전역 매핑에서 **빠집니다**.

```jsx
// ❌ 인라인 색상은 다크모드 전환 불가
style={{ color: '#1A1A1A' }}

// ✅ Tailwind 클래스 사용 (전역 매핑 적용)
className="text-charcoal-900"

// ✅ 또는 CSS 변수
style={{ color: 'var(--color-text)' }}
```

**점검 기준**
```
[ ] 다크모드로 전환 후 텍스트가 배경 위에서 모두 읽히는가?
[ ] 인라인 style에 color 하드코딩이 없는가?
[ ] Navbar, 카드, 인풋 라벨 텍스트가 다크모드에서 모두 전환되는가?
```

---

### 7. CSS Module 미정리 (데드코드 잔존)

**증상**: `.module.css` 파일이 남아 있지만 실제로 import하지 않는 경우. 또는 Tailwind 전환 후 구 파일 방치.

**발견된 위치**: `Toast.module.css`, `ReviewForm.module.css`

**처리 기준**
```
[ ] 실제로 import하는 파일이 있는가?
    → 없으면: 파일 내용을 /* DELETED — [이유] */ 로 교체 (git 이력 보존)
[ ] import는 있지만 Tailwind로 전환 예정인가?
    → 전환 완료 후 동일하게 처리
```

---

### 8. CSS Module 기반 컴포넌트의 다크모드 누락

**발견된 위치**: `Toast.js` → `Toast.module.css` (`.dark {}` 블록 없음)

**확인 방법**
```
[ ] CSS Module에서 사용하는 var(--color-*) 변수가 index.css에 .dark {} 안에도 정의되어 있는가?
[ ] 없다면 Tailwind dark: 변형으로 재작성하거나 index.css에 다크 변수 추가
```

---

## 🟡 UI 일관성 — 디자인 언어 통일

### 9. 인터랙티브 요소 스타일 일관성

> **"라이트/다크모드 버튼도 같은 디자인을 채용해서 일관화시키고, 독후감 작성 버튼도 일관성 있게 바꾸면 좋겠어. 버튼 형식 말고 다른 세부 페이지 버튼처럼 문자로만 이뤄진 걸로."**

**이 프로젝트의 규칙**: Navbar 내 모든 인터랙티브 요소는 **텍스트 링크** 스타일로 통일. `<button>` 배경색·border 없음.

| 요소 | 규칙 |
|------|------|
| Navbar 링크 | 텍스트만, hover 시 `text-ink-500` 색상 전환 |
| ThemeToggle | 텍스트만(`다크`/`라이트`), 고정 너비 wrapper |
| 독후감 작성 버튼 | 텍스트 링크 (`<Link>` 또는 `<a>`) |
| 주요 CTA 버튼 | `btn-ink` 유틸리티 클래스 (LandingPage Hero 등) |

**점검 기준**
```
[ ] Navbar 내 모든 버튼이 배경·border 없는 텍스트 링크인가?
[ ] 새로 추가한 Navbar 요소가 기존 링크 스타일(hover 등)을 따르는가?
[ ] 세부 페이지의 액션 버튼이 LandingPage와 동일한 btn-ink 클래스를 쓰는가?
```

---

### 10. Navbar 호버 카드 — 불필요한 요소 제거

> **"바로가기 텍스트가 있을 필요도 없는 것 같다. 글자 수에 따라 두 줄로 넘어가는 건 별로 보기 안 좋네."**

**이 프로젝트의 호버 카드 구조 규칙**:
- 아이콘 + 링크 이름 (굵게)
- 한 줄 설명 (충분한 카드 너비로 줄바꿈 방지)
- "바로가기 →" 같은 중복 액션 텍스트 **사용하지 않음**

```jsx
// ✅ 호버 카드 구조
<div className="w-60 p-4 rounded-lg shadow-lg">   {/* w-60: 설명 한 줄 보장 */}
  <div className="flex items-center gap-2 mb-1">
    <Icon className="w-4 h-4" />
    <span className="font-medium">{link.label}</span>
  </div>
  <p className="text-sm text-charcoal-500">{link.description}</p>
  {/* ❌ <div>"바로가기 →"</div> 넣지 않음 */}
</div>
```

---

### 11. 페이지 간 테마 일관성

**증상**: LandingPage는 B테마(linen/charcoal/ink-500)인데 세부 페이지는 구형 스타일 그대로.

**점검 기준**
```
[ ] section-heading, eyebrow 유틸리티 클래스를 사용하는가?
[ ] 버튼이 btn-ink / btn-ghost-ink를 사용하는가?
[ ] 텍스트가 text-charcoal-* 계열인가? (text-gray-* 사용 금지)
[ ] 테두리가 border-linen-* 계열인가? (border-gray-* 사용 금지)
[ ] 배경이 bg-linen-* 또는 CSS 변수인가?
```

---

## 🟢 스타일 시스템 — 어느 것을 쓸지 기준

### 12. 색상 적용 기준표

| 상황 | 권장 방법 | 금지 |
|------|-----------|------|
| 텍스트 색상 | `text-charcoal-*` (전역 매핑) | `text-gray-*`, 인라인 color 하드코딩 |
| 배경 — 카드/패널 | `style={{ backgroundColor: 'var(--color-surface)' }}` | `bg-white` 직접 |
| 배경 — 페이지 전체 | `style={{ backgroundColor: 'var(--color-bg)' }}` | — |
| 배경 — Tailwind 유틸 | `bg-linen-50`, `bg-linen-100` 등 | `bg-gray-*` |
| 테두리 | `border-linen-300` (전역 자동 대응) | `border-gray-*` |
| 인풋 배경 | `style={{ backgroundColor: 'var(--color-input-background)' }}` | `bg-white` |
| 알림/상태 색상 | Tailwind `dark:` 변형 직접 명시 | — |
| 포인트 색상 | `text-ink-500`, `bg-ink-500` | — |

---

## 🔵 중앙 관리 — 분산된 상수·설정

### 13. 공유 상수 단일 소스화

> **"200만+ 나 독후감 최대길이 2,000자 같은 정보는 추후 관리 작업 사항으로 따로 기재해줘."**

**이 프로젝트의 분산 상수 현황** (MAINTENANCE_NOTES 연동):

| 상수명 | 현재 위치 | 문제 |
|--------|-----------|------|
| `REVIEW_MAX_LENGTH` | `ReviewForm.js` | LandingPage의 "2,000자" 텍스트와 별개 관리 |
| `BOOK_COUNT_DISPLAY` | LandingPage 하드코딩 | "200만+" 수치 별도 관리 필요 |
| NAV_LINKS | `Layout.js` (✅ 통합 완료) | — |

**처리 원칙**
```
[ ] UI에 노출되는 수치(API 한계, 최대 길이 등)는 상수로 추출되어 있는가?
[ ] 같은 수치가 두 곳 이상 하드코딩되어 있지 않은가?
[ ] NAV_LINKS처럼 레이아웃 전반에 영향을 주는 설정은 Layout.js 또는 constants.js에 모여 있는가?
```

---

## ✅ 새 컴포넌트 작성 시 체크리스트

```
레이아웃 안정성
[ ] 텍스트가 바뀌는 요소에 고정 너비 wrapper가 있는가?
[ ] 카드 구조가 flex flex-col + flex-grow + mt-auto 패턴을 따르는가?
[ ] Navbar가 sticky인가? (fixed 사용 금지)

스타일
[ ] bg-white를 직접 쓴 곳이 없는가?
[ ] text-gray-*, border-gray-*, bg-gray-*를 쓴 곳이 없는가?
[ ] 텍스트: text-charcoal-* 계열 사용
[ ] 배경: CSS 변수 또는 bg-linen-* 사용
[ ] 버튼: btn-ink / btn-ghost-ink 유틸리티 클래스 사용
[ ] Navbar 내 요소: 텍스트 링크 스타일 (배경·border 없음)

다크모드
[ ] 다크모드에서 직접 확인했는가?
[ ] 인라인 style에 color/background 하드코딩이 없는가?
[ ] CSS Module을 쓴다면 .dark {} 블록이 index.css에 정의되어 있는가?

네이티브 요소
[ ] <select>에 appearance-none + 커스텀 SVG 화살표가 적용되었는가?
[ ] <input>, <textarea>에 outline-none + focus ring이 명시되어 있는가?

코드 정리
[ ] 사용하지 않는 CSS Module import가 없는가?
[ ] 사용하지 않는 .module.css 파일이 생기지 않았는가?
[ ] 공유 상수는 단일 소스(Layout.js 또는 constants.js)에서 가져오는가?
```

---

## ✅ 기존 컴포넌트 리뷰 시 체크리스트

```
발견 즉시 수정
[ ] bg-white 하드코딩 → CSS 변수로 교체
[ ] text-gray-* / border-gray-* → B테마 계열로 교체
[ ] 인라인 color 하드코딩 → text-charcoal-* 또는 CSS 변수
[ ] position: fixed Navbar → position: sticky로 교체
[ ] 네이티브 select → appearance-none + 커스텀 화살표

확인 후 판단
[ ] .module.css 파일이 실제로 import되는가? → 아니면 DELETED 처리
[ ] 텍스트가 바뀌는 버튼/토글에 고정 너비가 있는가?
[ ] 카드 목록에서 하단 요소가 고르게 정렬되는가?
[ ] 호버 카드/드롭다운의 너비가 콘텐츠 범람을 막는가?
[ ] 페이지 헤더가 section-heading / eyebrow 구조를 따르는가?
[ ] Navbar 내 새 요소가 텍스트 링크 스타일을 따르는가?
```

---

## 📋 MAINTENANCE_NOTES 연동 항목

아래 항목은 이 체크리스트와 별도로 `Documentation/MAINTENANCE_NOTES.md`에서 관리합니다.

| 항목 | 참조 섹션 |
|------|-----------|
| `REVIEW_MAX_LENGTH` 상수화 | §13 공유 상수 |
| Gallery 프리뷰 동적화 (localStorage) | — |
| SearchBar 리디자인 (SortOptions/RecentSearches B테마) | — |
| Vite 마이그레이션 (CRA 유지보수 종료) | — |

---

*최종 업데이트: 2026-03-02*
*Phase 1-1 ~ 1-7 전체 수정 이력 기반으로 재작성*
*반복 지적 사항: Layout Shift(§1), 카드 높이 균형(§2), Navbar sticky(§3), 네이티브 select(§4), 다크모드 텍스트(§6)*
