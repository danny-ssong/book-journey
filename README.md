# 독서 감상 기록 앱

## 🗂️ 폴더 구조

```
src/
├── app/                          # App Router
│   ├── (home)/                   # 홈 페이지 - 최신 게시글
│   │   └── _components/          # 각 페이지, 컴포넌트에서만 사용하는 컴포넌트들
│   ├── books/[isbn]/             # 책 상세 페이지
│   ├── posts/                    # 포스트 관련 페이지
│   │   ├── [postId]/             # 포스트 상세
│   │   ├── new/                  # 포스트 작성
│   │   └── edit/[postId]/        # 포스트 수정
│   ├── search/                   # 책 검색 페이지
│   ├── users/[userId]/           # 사용자 프로필
│   ├── manage/                   # 마이페이지
│   │   ├── posts/                # 내 글 관리
│   │   ├── settings/profile/     # 프로필 설정
│   │   └── statistics/           # 독서 통계
│   ├── login/                    # 로그인
│   └── signup/                   # 회원가입
│
├── components/                   # 재사용 가능한 컴포넌트
│   ├── book/                     # 책 관련
│   ├── post/                     # 포스트 관련
│   ├── user/                     # 사용자 관련
│   ├── common/                   # 공통
│   ├── layout/                   # 레이아웃
│   └── ui/                       # shadcn/ui
│
├── api/                          # API 호출 함수
│   ├── server/                   # 서버 컴포넌트용 API
│   └── *.ts                      # 클라이언트용 API
│
├── hooks/                        # 커스텀 훅
├── providers/                    # Context Providers
├── react-query/                  # React Query 설정
├── schemas/                      # Zod 스키마
├── types/                        # TypeScript 타입
└── utils/                        # 헬퍼 함수

```

</br>

## 렌더링

### SSG (Static Site Generation)

- `/posts/[postId]` - 포스트 상세 페이지
  - 포스트 수정, 삭제의 경우 revalidatePath를 호출하여 즉시 최신화

### ISR (Incremental Static Regeneration)

- `/users/[userId]` - 유저 프로필 페이지

  - 실시간성이 중요하지 않으므로, 1시간 마다 최신화

- `/books/[isbn]` - 책 정보 페이지 (관련 유저 포스트 포함)
  - 실시간성이 중요하지 않으므로, 1시간 마다 최신화

</br></br>

## 🔧 사용 기술

### 코어

- Next.js 14.2.32 (App Router)
- React 18

### 사용 라이브러리

- TanStack Query v5.59 (React Query)
- React Hook Form 7.64.0
- Zod 4.1.12
- Context API

### UI/UX

- Tailwind CSS
- shadcn/ui: 재사용 가능한 UI 컴포넌트
- Chart.js: 독서 통계 차트
- next-themes 0.4.6 (다크모드)

</br></br>

## 주요 기능

1. **인증 및 사용자 관리**

   - Google 소셜 로그인
   - 사용자 프로필 관리 (닉네임, 자기소개)

2. **포스트 작성**

3. **책 검색**

4. **독서 통계**

   - 월별 독서량 차트
   - 저자별 독서량 차트
   - 작성한 포스트 수 집계

5. **최신 포스트 무한 스크롤**

</br>

## 배포

`Vercel`을 통한 배포

## 사이트

https://book-journey-beta.vercel.app/
