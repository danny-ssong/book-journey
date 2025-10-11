import { Author } from "./author";
import { Post } from "./post";

export interface Book {
  isbn: string;
  title: string;
  contents: string;
  url: string;
  publisher: string;
  author: Author;
  thumbnailUrl: string;
  publishedAt: Date;
}

export interface BookWithPosts extends Book {
  posts: Post[];
}

export interface CreateBook extends Omit<Book, "author"> {
  author: string;
}

export interface SearchedBook extends Book {
  // datetime: string;
  // thumbnail: string;
  price: number;
  sale_price: number;
  status: string;
  translators: string[];
}
