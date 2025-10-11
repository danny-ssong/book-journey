import { z } from "zod";

const createBookSchema = z.object({
  isbn: z.string(),
  title: z.string(),
  contents: z.string(),
  url: z.string(),
  publisher: z.string(),
  author: z.string(),
  thumbnailUrl: z.string(),
  publishedAt: z.date(),
});

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "제목을 입력해주세요")
    .max(20, "제목은 20자 이하로 입력해주세요"),
  content: z
    .string()
    .min(1, "감상을 입력해주세요")
    .max(1000, "감상은 1000자 이하로 입력해주세요"),
  rating: z.number().min(1).max(5),
  startDate: z.date().refine((date) => date !== null, {
    message: "읽은 날짜를 선택해주세요",
  }),
  isPrivate: z.boolean(),
  book: createBookSchema.nullable().refine((book) => book !== null, {
    message: "책을 선택해주세요",
  }),
});

export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = Partial<CreatePost>;
