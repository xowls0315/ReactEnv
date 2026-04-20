# 블록 React 전환 가이드

기존 PHP 디자인 모드의 `main1.html` 블록을 React 프로젝트(`reactEnv`)에서 동작하도록 전환한 예시입니다.  
선임 공유용으로, **왜 이렇게 나누는지**와 **실제 파일에 어떻게 들어가는지**를 함께 정리했습니다.

---

## 1. 전환 목표

- 기존 방식: 블록 하나에 `<style> + HTML + <script>`를 한 번에 삽입
- React 방식: 구조/스타일/데이터/동작을 파일로 분리
- 목표: 디자인 유지 + 유지보수성/확장성/재사용성 개선

핵심 메시지:
> “디자인은 그대로 두고, 코드 구조만 React 친화적으로 재배치한다.”

---

## 2. 결과 요약 (이번에 실제 반영된 항목)

- `main1.html`을 React 컴포넌트로 변환
- CDN Swiper 초기화 코드를 `swiper/react` 기반으로 전환
- 모션 감소 환경(`prefers-reduced-motion`) 대응을 `useEffect`로 이관
- `javascript:GoSubBoard(...)` 링크를 클릭 이벤트 기반 브릿지 함수로 변경
- 슬라이드 이미지/리스트 텍스트를 데이터 파일로 분리
- 빌드 검증 완료 (`npm run build` 성공)

---

## 3. 파일 구조 (React에서 실제로 들어간 위치)

```txt
src/
  App.tsx
  swiper.d.ts
  mainBlock/
    main1.html                  # 원본 보관용(참고)
    Main1Section.tsx            # 구조/동작(JSX + Hook)
    Main1Section.css            # 스타일
    main1Data.ts                # 콘텐츠 데이터
    legacyNavigation.ts         # 레거시 함수 브릿지
```

---

## 4. 파일별 역할

### `src/App.tsx`
- 앱 진입 시 `Main1Section` 렌더

### `src/mainBlock/Main1Section.tsx`
- 기존 HTML 구조를 JSX로 변환
- 기존 `<script> new Swiper(...)`를 React Swiper 설정으로 치환
- 버튼 클릭 시 `openLegacyBoard(...)` 호출

### `src/mainBlock/Main1Section.css`
- 기존 `<style>` 내용을 별도 CSS 파일로 분리
- 클래스명(`tj1-*`) 유지로 디자인 차이 최소화

### `src/mainBlock/main1Data.ts`
- 슬라이드 URL, 체크리스트 텍스트 등 반복/콘텐츠 데이터 분리
- 추후 CMS 연동 또는 API 치환이 쉬운 구조

### `src/mainBlock/legacyNavigation.ts`
- `window.GoSubBoard`가 존재하면 기존 PHP 방식 그대로 호출
- 없으면 fallback 경로(`/contact`, `/portfolio`)로 이동
- 점진 전환 단계에서 안전한 공존을 위한 브릿지

### `src/swiper.d.ts`
- TypeScript에서 `swiper/css` side-effect import 인식용 선언

---

## 5. 전환 절차 (발표 시 설명 순서)

### Step 1) 원본 블록을 4개 관심사로 분해
- 구조(HTML)
- 스타일(CSS)
- 동작(Script)
- 콘텐츠 데이터(문구, URL, 메뉴 파라미터)

### Step 2) HTML -> JSX 문법 변환
- `class` -> `className`
- `href="javascript:..."` 제거
- 반복 UI는 배열 `map` 렌더링으로 변경

### Step 3) Script 초기화 -> React 생명주기 이동
- 기존: 페이지 로드 후 전역 script 실행
- 변경: 컴포넌트 렌더 시 Swiper 설정 + `useEffect`에서 부가 제어

### Step 4) 레거시 함수 공존 처리
- 기존 백엔드 함수가 살아있는 환경은 그대로 호출
- React 단독 환경은 fallback 라우트로 처리

### Step 5) 검증
- `npm run build`로 타입/번들 검증
- 변경 파일 lint 진단 확인

---

## 6. 왜 이 구조가 좋은가

- **유지보수성**: 수정 위치가 명확함 (구조/스타일/동작 분리)
- **확장성**: `main2`, `main3`, `main4`도 동일 패턴 복제 가능
- **안전성**: 레거시 함수와 React 라우트가 공존 가능
- **재사용성**: 데이터 파일만 바꿔도 유사 블록 빠르게 생성 가능

---

## 7. 실행 방법

```bash
npm install
npm run dev
```

검증:

```bash
npm run build
```

---

## 8. 한 줄 정리

기존 PHP 블록 에디터의 단일 HTML 블록을 React에서는 `컴포넌트 + 스타일 + 데이터 + 레거시 브릿지`로 분해하고, 스크립트 초기화 로직을 Hook 기반으로 이동해 디자인은 유지하면서 운영/확장 효율을 높였습니다.
