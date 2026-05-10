import dayjs from "dayjs";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Star } from "lucide-react";

// 테스트용 mock 데이터
const mockPost = {
  id: 1,
  title: "공개로 작성된 포스트 제목",
  content:
    "공개로 작성된 포스트 내용입니다. 본문 길이가 어느 정도 될 때 어떻게 보이는지 확인하기 위한 텍스트입니다.",
  rating: 4,
  user: {
    id: "user-1",
    nickname: "excited-tree",
  },
  book: {
    isbn: "9788932473901",
    title: "직업으로서의 소설가",
    author: "무라카미 하루키",
  },
  createdAt: new Date("2026-01-28"),
};

const mockPostLong = {
  ...mockPost,
  id: 2,
  title: "sdf",
  content:
    "sdfdsada sdfdsada sdfdsada sdfdsada sdfdsadasdfdsada sdfdsada sdfdsada sdfdsada sdfdsadasdfdsadasdfdsadasdfdsadasdfdsadasdfdsadasdfdsadasdfdsadasdfdsada",
  rating: 5,
  user: { id: "u2", nickname: "sad-bird2323" },
  createdAt: new Date("2026-05-10"),
};

// 책 표지 placeholder (외부 이미지 의존 없이 테스트하기 위함)
function BookCoverPlaceholder() {
  return (
    <div className="flex h-[174px] w-[120px] shrink-0 flex-col items-center justify-center rounded-md border bg-pink-100 p-2 text-center text-[10px] text-pink-900">
      <span className="opacity-60">무라카미 하루키</span>
      <span className="mt-2 font-semibold">직업으로서의 소설가</span>
    </div>
  );
}

function StarRow({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`평점 ${rating}점`}>
      {[...Array(5)].map((_, i) => {
        const filled = i + 1 <= rating;
        return (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={
              filled ? "fill-primary text-primary" : "text-muted-foreground/30"
            }
            aria-hidden
          />
        );
      })}
    </div>
  );
}

function Dot() {
  return (
    <span aria-hidden className="text-muted-foreground">
      ·
    </span>
  );
}

type VariantProps = { post: typeof mockPost };

// === 0. Current (Option A) — 현재 배치 ===
function VariantCurrent({ post }: VariantProps) {
  return (
    <Card className="h-auto sm:h-[210px]">
      <article className="flex h-full gap-3 p-4 sm:gap-4">
        <BookCoverPlaceholder />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-2">
            <p className="max-w-40 truncate text-sm sm:max-w-80">
              {post.book.title}
            </p>
            <p className="line-clamp-1 whitespace-nowrap text-sm text-muted-foreground">
              {post.book.author}
            </p>
          </header>

          <div className="flex items-center gap-2">
            <p className="text-sm">{post.user.nickname}</p>
            <Dot />
            <StarRow rating={post.rating} />
            <Dot />
            <time className="text-sm text-muted-foreground">
              {dayjs(post.createdAt).format("YYYY-MM-DD")}
            </time>
          </div>

          <h1 className="line-clamp-1 text-lg">{post.title}</h1>
          <p className="line-clamp-3 text-sm">{post.content}</p>
        </section>
      </article>
    </Card>
  );
}

// === 1. 평점만 책 정보 라인 우측으로 ===
function VariantRatingTopRight({ post }: VariantProps) {
  return (
    <Card className="h-auto sm:h-[210px]">
      <article className="flex h-full gap-3 p-4 sm:gap-4">
        <BookCoverPlaceholder />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <p className="max-w-40 truncate text-sm sm:max-w-80">
                {post.book.title}
              </p>
              <p className="line-clamp-1 whitespace-nowrap text-sm text-muted-foreground">
                {post.book.author}
              </p>
            </div>
            <StarRow rating={post.rating} size={14} />
          </header>

          <div className="flex items-center gap-2">
            <p className="text-sm">{post.user.nickname}</p>
            <Dot />
            <time className="text-sm text-muted-foreground">
              {dayjs(post.createdAt).format("YYYY-MM-DD")}
            </time>
          </div>

          <h1 className="mt-1 line-clamp-1 text-lg">{post.title}</h1>
          <p className="line-clamp-3 text-sm">{post.content}</p>
        </section>
      </article>
    </Card>
  );
}

// === 2. 메타 라인을 작고 옅게 ===
function VariantSubtleMeta({ post }: VariantProps) {
  return (
    <Card className="h-auto sm:h-[210px]">
      <article className="flex h-full gap-3 p-4 sm:gap-4">
        <BookCoverPlaceholder />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-2">
            <p className="max-w-40 truncate text-sm sm:max-w-80">
              {post.book.title}
            </p>
            <p className="line-clamp-1 whitespace-nowrap text-sm text-muted-foreground">
              {post.book.author}
            </p>
          </header>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{post.user.nickname}</span>
            <Dot />
            <StarRow rating={post.rating} size={12} />
            <Dot />
            <time>{dayjs(post.createdAt).format("YYYY-MM-DD")}</time>
          </div>

          <h1 className="mt-1.5 line-clamp-1 text-lg">{post.title}</h1>
          <p className="line-clamp-3 text-sm">{post.content}</p>
        </section>
      </article>
    </Card>
  );
}

// === 3. 1+2 조합 ===
function VariantCombined({ post }: VariantProps) {
  return (
    <Card className="h-auto sm:h-[210px]">
      <article className="flex h-full gap-3 p-4 sm:gap-4">
        <BookCoverPlaceholder />
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <p className="max-w-40 truncate text-base sm:max-w-80">
                {post.book.title}
              </p>
              <p className="line-clamp-1 whitespace-nowrap text-sm text-muted-foreground">
                {post.book.author}
              </p>
            </div>
            <StarRow rating={post.rating} size={16} />
          </header>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{post.user.nickname}</span>
            <Dot />
            <time>{dayjs(post.createdAt).format("YYYY-MM-DD")}</time>
          </div>

          <h1 className="mt-2 line-clamp-1 text-lg">{post.title}</h1>
          <p className="line-clamp-3 text-sm">{post.content}</p>
        </section>
      </article>
    </Card>
  );
}

const variants = [
  {
    label: "0. Current — 현재 배치 (Option A)",
    description:
      "책정보 / 닉네임·★·날짜 / 제목 / 본문. 메타 라인이 시각적으로 무거움.",
    Component: VariantCurrent,
  },
  {
    label: "1. 평점만 책 정보 라인 우측으로",
    description:
      "평점 = 책에 대한 평가. 책 정보 라인 우측 정렬. 메타 라인이 닉네임+날짜만 남아 가벼워짐.",
    Component: VariantRatingTopRight,
  },
  {
    label: "2. 메타 라인을 작고 옅게",
    description:
      "닉네임/평점/날짜를 text-xs + muted로. 평점 별 크기 축소. 포스트 제목과의 톤 차이로 위계 강화.",
    Component: VariantSubtleMeta,
  },
  {
    label: "3. 조합 (1 + 2) — 추천",
    description:
      "평점은 책 정보 라인 우측, 닉네임+날짜는 작고 옅게. 메타 노이즈 최소화.",
    Component: VariantCombined,
  },
];

export default function PostCardTestPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 p-6">
      <header>
        <h1 className="text-2xl font-bold">PostCard 배치 비교</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          4가지 배치안을 짧은 본문 / 긴 본문 두 케이스로 비교합니다.
        </p>
      </header>

      {variants.map(({ label, description, Component }) => (
        <section key={label} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{label}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div
            className={cn(
              "space-y-3",
              "rounded-lg border-2 border-dashed border-muted-foreground/20 p-4",
            )}
          >
            <Component post={mockPostLong} />
            <Component post={mockPost} />
          </div>
        </section>
      ))}
    </main>
  );
}
