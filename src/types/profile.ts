import { Author } from "./author";
import { User } from "./user";

export interface Profile {
  id: number;
  nickname: string;
  avatarUrl: string;
  bio: string;
  user: User;
  mostReadAuthors: Author[];
}
