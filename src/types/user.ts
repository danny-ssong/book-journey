import { Author } from './author'

export interface User {
  id: string
  profile: Profile
}

export interface Profile {
  id: string
  nickname: string
  avatarUrl: string
  bio: string
  mostReadAuthors: Author[]
}

export interface UpdateProfile {
  nickname?: string
  bio?: string
}

export interface UpdateProfileImage {
  image: File | null
}
