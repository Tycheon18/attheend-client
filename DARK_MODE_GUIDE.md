# 다크모드 운영 가이드

> AttheEnd-Client B테마(Ink & Linen)의 다크모드 구현 규칙과 주의사항을 기록합니다.
> **이 파일을 먼저 읽고 개발하세요.**

---

## 1. 시스템 구조

### 두 개의 다크모드 레이어가 동시에 작동합니다

| 레이어 | 위치 | 역할 |
|--------|------|------|
| CSS 변수 | `index.css` → `.dark {}` | `var(--color-*)` 기반 컴포넌트 |
| Tailwind `dark:` | `tailwind.config.js` `darkMode: 'class'` | Tailwind 유틸리티 클래스 |
| ThemeContext | `src/contexts/ThemeContext.js` | `<html class="dark">` 토글 + CSS 변수 주입 |

ThemeContext는 테마 변경 시:
1. `document.documentElement.classList.add/remove('dark')` → Tailwind `dark:` 활성화
2. `root.style.setProperty('--color-*', ...)` → CSS 변수 갱신

---

## 2. 색상 대응 규칙

### 텍스트 (가장 빈번한 문제)

```
라이트 → 다크 매핑
text-charcoal-900 (#1A1A1A) → dark:text-linen-50  (#FAFAF8)
text-charcoal-700 (#4A4540) → dark:text-linen-100 (#F2F0EB)
text-charcoal-600 (#6A6260) → dark:text-linen-200 (#E8E4DC)
text-charcoal-500 (#8C857D) → dark:text-linen-300 (#D8D2C8)
```

**전역 자동 대응**: `index.css`의 `@layer base`에서 위 매핑이 자동 적용됩니다.
새 컴포넌트에 `text-charcoal-*`를 쓰면 다크모드에서 자동으로 `text-linen-*`로 전환됩니다.

### 배경 (두 번째로 빈번한 문제)

```
bg-white          → dark: var(--color-surface)  (#1C1C1C)
bg-linen-50       → dark: var(--color-bg)        (#141414)
bg-linen-100      → dark: var(--color-surface)   (#1C1C1C)
bg-linen-200      → dark: var(--color-surface2)  (#242424)
border-linen-300  → dark: var(--color-border)    (#2A2A2A)
```

**전역 자동 대응**: `index.css`의 `@layer base`에서 자동 적용됩니다.

---

## 3. 레이아웃 이동 방지 규칙 (Layout Shift)

### 원인
다크/라이트 모드 전환 시 텍스트 길이가 달라지면 (`다크` 2자 ↔ `라이트` 3자) 주변 요소가 밀립니다.

### 해결 방법

```jsx
// ❌ 잘못된 예 — 텍스트 길이에 따라 버튼 너비가 변함
<button>
  <Moon /> {isDark ? '라이트' : '다크'}
</button>

// ✅ 올바른 예 — 텍스트 영역 고정 너비
<button>
  {isDark ? <Sun /> : <Moon />}
  <span className="inline-block w-7 text-left">
    {isDark ? '라이트' : '다크'}
  </span>
</button>
```

### 적용 대상
- `ThemeToggle.js` — 텍스트 `w-7` 고정 너비 ✅ 적용됨
- Navbar 우측 슬롯 전체 — `min-w` 고정 필요 시 추가

---

## 4. 컴포넌트별 다크모드 체크리스트

### Navbar
- [x] 배경: `var(--color-bg)` inline style
- [x] 테두리: `var(--color-border)` inline style
- [x] 로고 텍스트: `dark:text-linen-50` (전역 대응)
- [x] 링크 텍스트: `dark:text-linen-100` (전역 대응)
- [x] 모바일 메뉴 배경: `var(--color-surface)` inline style

### ThemeToggle
- [x] 아이콘/텍스트 색: charcoal-700 → linen 자동 대응
- [x] 레이아웃 이동 방지: `w-7` 고정 너비

### 페이지 공통 (section-heading, eyebrow)
- [x] `section-heading`: `var(--color-text)` 사용
- [x] `eyebrow`: ink-500 → dark에서 ink-400 (전역 대응)

### 카드 (card-base)
- [x] 배경: bg-white → dark 자동 대응
- [x] 테두리: border-linen-300 → dark 자동 대응

---

## 5. 새 컴포넌트 작성 시 필수 사항

```jsx
// 1. 배경색 — CSS 변수 사용 (권장)
style={{ backgroundColor: 'var(--color-bg)' }}
style={{ backgroundColor: 'var(--color-surface)' }}

// 2. 텍스트 — Tailwind charcoal 클래스 사용 (전역 대응 자동)
className="text-charcoal-900"  // 자동으로 dark에서 text-linen-50

// 3. 테두리 — CSS 변수 또는 linen 클래스
style={{ borderColor: 'var(--color-border)' }}
className="border-linen-300"   // 자동으로 dark에서 어두운 테두리

// 4. 입력 필드
style={{ backgroundColor: 'var(--color-input-background)' }}

// 5. 절대 하드코딩 금지
className="bg-white text-gray-900"  // ❌ 다크모드 불가
className="bg-white dark:bg-[#1C1C1C] text-gray-900 dark:text-white"  // ⚠️ 가능하지만 비권장
```

---

## 6. 알려진 이슈 및 처리 내역

| 날짜 | 이슈 | 해결 방법 | 파일 |
|------|------|-----------|------|
| 2026-02-28 | Navbar bg-white 다크모드 미대응 | CSS var inline style로 교체 | `Navbar.jsx` |
| 2026-02-28 | section-heading text-charcoal-900 고정 | var(--color-text) 사용 | `index.css` |
| 2026-02-28 | ThemeToggle 라이트/다크 글자 수 차이로 레이아웃 이동 | `w-7` 고정 너비 | `ThemeToggle.js` |
| 2026-02-28 | 모든 charcoal 텍스트 다크모드 미대응 | @layer base 전역 매핑 추가 | `index.css` |
| 2026-02-28 | 독후감 작성 버튼 분산 관리 | NAV_LINKS에 통합 | `Layout.js` |

---

## 7. CSS 변수 전체 목록

### `index.css` 기준 (ThemeContext의 JS 변수와 별도 관리)

| 변수 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--color-bg` | `#FAFAF8` | `#141414` | 페이지 기본 배경 |
| `--color-surface` | `#F2F0EB` | `#1C1C1C` | 카드, 패널 배경 |
| `--color-surface2` | `#E8E4DC` | `#242424` | 2단계 표면 |
| `--color-border` | `#D8D2C8` | `#2A2A2A` | 테두리 |
| `--color-text` | `#1A1A1A` | `#FAFAF8` | 기본 텍스트 |
| `--color-text2` | `#4A4540` | `#B8B0A8` | 보조 텍스트 |
| `--color-text3` | `#8C857D` | `#6A6260` | 비활성 텍스트 |
| `--color-accent` | `#2D5F8A` | `#3B82C4` | ink blue |
| `--color-spine` | `#8B6F47` | `#D4A96A` | spine brown |
| `--color-shadow` | `rgba(26,26,26,0.07)` | `rgba(0,0,0,0.25)` | 그림자 |

> ThemeContext(`ThemeContext.js`)에도 별도의 CSS 변수 세트가 있습니다.
> 두 세트가 중복되므로, 장기적으로 ThemeContext의 JS 색상 객체와 index.css의 CSS 변수를 통합하는 리팩터링이 권장됩니다.

---

*최종 업데이트: 2026-03-01*
