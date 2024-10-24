import { Tables } from "@/types/database.types";

export type Post = Tables<"posts">;
export type Book = Tables<"books">;
export type Profile = Tables<"profiles">;
export type PostWithBook = Post & { books: Book };
