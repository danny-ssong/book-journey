import { useFormContext } from "react-hook-form";

export default function TitleInput() {
  const { register } = useFormContext();

  return (
    <input
      {...register("title")}
      className="h-12 w-full rounded-lg border p-4 text-2xl font-semibold placeholder:text-2xl"
      placeholder="제목을 입력하세요"
    />
  );
}
