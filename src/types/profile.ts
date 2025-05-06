import { User } from "@supabase/supabase-js";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

export interface Profile {
  id: number;
  nickname: string;
  avatarUrl: string;
  bio: string;
  user: User;
  mostReadAuthors: Author[];
}
