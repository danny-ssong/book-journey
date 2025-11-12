import { useFormContext } from "react-hook-form";

export default function ContentInput() {
  const { register } = useFormContext();

  return (
    <textarea
      {...register("content")}
      className="flex-1 resize-none rounded-lg border p-4"
      placeholder="감상을 작성해보세요"
    />
  );
}
