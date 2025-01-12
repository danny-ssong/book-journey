import { Tables, TablesInsert } from "@/types/database.types";

export type Post = Tables<"post">;
export type Book = Tables<"book">;
export type Profile = Tables<"profile">;
export type PostWithBook = Post & { book: Book };
export type PostWithUserProfile = Post & { profile: Profile };
export type PostWithUserProfileAndBook = Post & { profile: Profile } & {
  book: Book;
};

export type CreateProfileDto = TablesInsert<"profile">;
export type CreatePostDto = TablesInsert<"post">;
export type CreateBookDto = TablesInsert<"book">;
