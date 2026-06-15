'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CreatePost, createPostSchema } from '@/schemas/post'
import { getFirstZodErrorMessage } from '@/utils/zod-error-util'

import { useNavigationGuard } from '../_hooks/useNavigationGuard'
import ContentInput from './form-fields/ContentInput'
import PostFormBookSearchBar from './form-fields/PostFormBookSearchBar'
import PostFormFooter from './form-fields/PostFormFooter'
import PrivacySelector from './form-fields/PrivacySelector'
import RatingSelector from './form-fields/RatingSelector'
import ReadDatePicker from './form-fields/ReadDatePicker'
import TitleInput from './form-fields/TitleInput'

type PostFormProps = {
  defaultValues: CreatePost
  onSubmit: (values: CreatePost) => Promise<unknown>
}

export default function PostForm({ defaultValues, onSubmit }: PostFormProps) {
  const methods = useForm<CreatePost>({
    resolver: zodResolver(createPostSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = methods

  useNavigationGuard({ enabled: isDirty && !isSubmitting })

  const handleValidationError = (errors: FieldErrors<CreatePost>) => {
    const message = getFirstZodErrorMessage(errors)
    if (message) toast.error(message)
  }

  const submitForm = (values: CreatePost) => {
    onSubmit(values)
  }

  return (
    <FormProvider {...methods}>
      <form className="flex h-full flex-col" onSubmit={handleSubmit(submitForm, handleValidationError)}>
        <article className="mb-20 flex h-full flex-col gap-4">
          <PostFormBookSearchBar />
          <PrivacySelector />
          <div className="flex justify-between">
            <RatingSelector />
            <ReadDatePicker />
          </div>
          <TitleInput />
          <ContentInput />
        </article>
        <PostFormFooter />
      </form>
    </FormProvider>
  )
}
