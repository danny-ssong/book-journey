import { Controller, useFormContext } from "react-hook-form";

import Rating from "@/components/post/Rating";

export default function RatingSelector() {
  const { control } = useFormContext();

  return (
    <Controller
      name="rating"
      control={control}
      render={({ field: { onChange, value } }) => (
        <Rating rating={value} onClickStar={onChange} size="md" />
      )}
    />
  );
}
