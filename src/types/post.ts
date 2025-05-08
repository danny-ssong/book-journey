import { User } from "@/types/user";
import { Book } from "./book";

export interface Post {
  id: number;
  title: string;
  content: string;
  rating: number;
  startDate: Date;
  endDate: Date;
  isPrivate: boolean;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostWithBook extends Post {
  book: Book;
}
