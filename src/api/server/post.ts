import { getPost as getPostAction } from '@/actions/posts'
import { PostWithBook } from '@/types/post'

export async function getPost(postId: string): Promise<PostWithBook> {
  return getPostAction(postId)
}
