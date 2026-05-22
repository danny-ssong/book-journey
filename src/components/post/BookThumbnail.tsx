import Image from 'next/image'

import { cn } from '@/lib/utils'

type Props = {
  title: string
  thumbnailUrl: string
  className?: string
}

export default function BookThumbnail({ title, thumbnailUrl, className }: Props) {
  return (
    <figure className={cn('relative shrink-0 overflow-hidden rounded-md border', 'h-[116px] w-[80px]', className)}>
      <Image src={thumbnailUrl} alt={title} fill sizes="120px" className="object-cover" />
    </figure>
  )
}
