import { signOut as signOutAction } from '@/actions/auth'
import { getMe as getMeAction, updateMyProfile } from '@/actions/profiles'
import { UpdateProfile, User } from '@/types/user'

export async function getMe(): Promise<User> {
  const user = await getMeAction()
  if (!user) throw new Error('로그인이 필요합니다')
  return user
}

export async function updateProfile(input: UpdateProfile) {
  return updateMyProfile(input)
}

export async function logout() {
  await signOutAction()
}
