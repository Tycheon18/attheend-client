# AttheEnd-Client 유지보수 항목

> 현재 하드코딩된 수치/콘텐츠 중, 추후 실제 데이터로 교체하거나 동적으로 관리해야 할 항목들입니다.

---

## 🗺️ 전체 Phase 로드맵 & 진행 현황

| Phase | 내용 | 상태 |
|-------|------|------|
| **Phase 1** | SearchBar 리디자인 + 세부 페이지 다크모드 점검 | ✅ 완료 |
| **Phase 2** | cafe-landing 업그레이드 + portfolio/saas 이식 | ✅ 완료 |
| **Phase 3** | Vercel 배포 (ESLint 수정 → 빌드 통과) | ✅ 완료 (2026-03-05) |
| **Phase 4** | 다음 단계 선택 (하단 Options 참조) | ⏳ 미결정 |

---

## ✅ Phase 3 완료 내역 (2026-03-05)

### Vercel 배포
- `REACT_APP_KAKAO_API_KEY` 환경변수 설정 완료
- ESLint 오류 전체 수정 (CI 환경 `warnings as errors` 대응)
- 최종 통과 커밋: `fbe579c`

### ESLint 수정 파일 목록
| 파일 | 수정 내용 |
|------|-----------|
| `App.js` | unused `Main` import, `loadFromStorage` 함수 제거 |
| `Navbar.jsx` | `href="#"` → `href="/"` (jsx-a11y) |
| `ThemeContext.js` | `currentTheme` useEffect 의존성 배열 추가 |
| `LandingPage.jsx` | unused `X` import·`navigate` 제거, ref 클린업 패턴 수정 |
| `Main.js` | unused `Layout` import 제거 |
| `Search.js` | `eslint-disable-next-line` (무한루프 방지) |
| `ReviewTitleInput.js` | unused `useEffect` 제거 |
| `ReviewContentInput.js` | unused `useEffect` 제거 |
| `SearchBar.js` | `handleSearch` → useEffect 위로 이동, `eslint-disable` |
| `CTASection.jsx` | ref 클린업 패턴 수정, unused import 제거 |
| `FeatureCard.jsx` | ref 클린업 패턴 수정, unused imports 제거 |

### Ref 클린업 올바른 패턴
```js
// ❌ 틀린 방식 (stale closure)
return () => { if (ref.current) observer.unobserve(ref.current); };

// ✅ 올바른 방식 (값 캡처)
const el = ref.current;
if (!el) return;
observer.observe(el);
return () => { observer.unobserve(el); };
```

---

## 🔮 Phase 4 — 다음 단계 옵션

### Option A — 크몽 포트폴리오 등록 ⭐ 추천 (즉시 수익화)
**목표**: 배포된 Vercel URL을 활용해 크몽에 실사용 포트폴리오 등록

**작업 목록**
- [ ] 주요 페이지 스크린샷 (랜딩, 검색, 독후감 작성, 갤러리 — 라이트/다크 각각)
- [ ] 크몽 텍스트 준비: "React + Kakao API + UE5 실사용 프로젝트" 차별화 포인트
- [ ] 크몽 AttheEnd 슬롯 등록

**소요 예상**: 1–2세션

---

### Option B — 갤러리/기능 고도화
**목표**: 사용성 향상 및 포트폴리오 완성도 강화

**작업 목록**
- [ ] 독후감 검색/필터 강화 (제목, 별점 범위)
- [ ] 독후감 내보내기 (CSV 또는 PDF)
- [ ] URL 기반 공유 기능
- [ ] 독서 통계 차트 (월별 독서량, 장르 분포)

**소요 예상**: 2–3세션

---

### Option C — 백엔드 연동 (attheend-server)
**목표**: localStorage → 서버 DB로 이전, 다중 기기 지원

**작업 목록**
- [ ] attheend-server Express 서버 기동
- [ ] MongoDB 스키마 설계 (Book, Review)
- [ ] Kakao API 서버사이드 프록시 (API 키 은닉)
- [ ] 계정 관리 시스템 (JWT 또는 세션)
- [ ] 클라이언트 API 연동 (`src/api/reviews.js` 활성화)

**소요 예상**: 4–6세션

---

## 📊 랜딩 페이지 하드코딩 수치

| 위치 | 현재 값 | 교체 기준 |
|------|---------|-----------|
| Hero 통계 — 도서 DB | `200만+` | Kakao Books API 공식 문서 재확인 후 수정 |
| Hero 통계 — 독후감 길이 | `2,000자` | `ReviewContentInput.js` `MAX_LENGTH = 2000` 과 동기화 ✅ |
| Hero 통계 — 별점 | `★ 1–5` | 평점 범위 변경 시 수정 |
| `QUICK_SEARCHES` | 한강, 무라카미 하루키 등 | 분기별 수동 업데이트 권장 |

---

## ⚙️ 기술 부채

| 항목 | 설명 | 우선순위 |
|------|------|---------|
| `react-scripts 5.0.1` | CRA 유지보수 종료. 취약점 7개는 빌드 도구 내부 — 프로덕션 무관. 장기적으로 Vite 마이그레이션 검토 | 낮음 |
| `Main.js` | 레거시 파일, 활성 라우트 없음 — 추후 제거 가능 | 낮음 |
| Kakao CDN CORS | `crossOrigin` 없이 표시만 됨 — 캔버스 조작 불가 (현재 필요 없음) | 낮음 |

---

*최종 업데이트: 2026-03-05*
*Phase 3 (Vercel 배포) 완료 / 다음: Phase 4 옵션 선택*
