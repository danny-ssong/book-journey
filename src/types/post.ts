import { User } from "@/types/user";
import { Book, CreateBook } from "./book";

export interface Post {
  id: number;
  title: string;
  content: string;
  rating: number;
  startDate: Date;
  isPrivate: boolean;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithBook extends Post {
  book: Book;
}

export interface CreatePost {
  title: string;
  content: string;
  rating: number;
  startDate: Date;
  isPrivate: boolean;
  book: CreateBook;
}

export type UpdatePost = Partial<CreatePost>;
