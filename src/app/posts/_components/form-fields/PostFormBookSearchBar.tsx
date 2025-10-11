import { Controller, useFormContext } from "react-hook-form";

import BookSearchBar from "../../../../components/book/BookSearchBar";

export default function PostFormBookSearchBar() {
  const { control } = useFormContext();

  return (
    <Controller
      name="book"
      control={control}
      render={({ field: { onChange, value } }) => (
        <BookSearchBar
          selectedBookTitle={value?.title}
          onSelectBook={(book) =>
            onChange(
              book
                ? {
                    ...book,
                    author: book.author.name,
                    publishedAt: new Date(book.publishedAt),
                  }
                : null,
            )
          }
        />
      )}
    />
  );
}
