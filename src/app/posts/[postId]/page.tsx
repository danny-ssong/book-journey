import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPost, getPosts } from '@/api/client/post'

import PostViewer from '../_components/PostViewer'

type Props = {
  params: Promise<{
    postId: string
  }>
}

export default async function Page(props: Props) {
  const params = await props.params
  const postId = params.postId
  if (!postId) notFound()

  const post = await getPost(postId)

  return <PostViewer post={post} />
}

export async function generateStaticParams() {
  const posts = await getPosts(999)

  return posts.data.map((post) => ({
    postId: String(post.id),
  }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const post = await getPost(params.postId)
  if (!post) return { title: 'Book-journey' }
  return { title: `${post.title}` }
}
