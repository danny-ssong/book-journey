import { createClient } from "@/utils/supabase/client";
import { FormEventHandler, useState } from "react";
import dayjs from "dayjs";

export default function PostForm({ book, initPost }: any) {
  const supabase = createClient();
  const [title, setTitle] = useState(initPost?.title ?? "");
  const [content, setContent] = useState(initPost?.content ?? "");
  const [startDate, setStartDate] = useState<string>(
    dayjs(initPost?.startDate ?? new Date()).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(
    dayjs(initPost?.endDate ?? new Date()).format("YYYY-MM-DD")
  );
  const [rating, setRating] = useState<number>(initPost?.rating ?? 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) {
      alert("책을 선택해주세요");
    }
    // const { data, error } = await supabase.from("posts").insert({
    //   title,
    //   content,
    //   book,
    // });
    //insert posts

    //에러가 아니면
    //router.push('')로 해당 책 아이디나 내가 쓴 글
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                className={`${
                  starValue > rating ? "text-gray-300" : "text-yellow-400"
                } cursor-pointer text-3xl`}
                key={index}
                onClick={() => setRating(starValue)}
              >
                &#9733;
              </span>
            );
          })}
        </div>
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => console.log(e.target.value)}
          />
          {/* yyyy-mm-dd로 나옴 */}
          <input
            type="date"
            value={endDate}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>

      <textarea
        className="w-full h-12 placeholder:text-gray-400 placeholder:text-2xl  text-black text-2xl font-semibold resize-none overflow-hidden border-b-2 border-gray-500"
        placeholder="제목을 입력하세요"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        className="w-full h-[800px] resize-none text-black"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="w-full flex justify-end items-center">
        <button
          className="px-4 py-2 border border-black rounded-full"
          type="submit"
        >
          저장
        </button>
      </div>
    </form>
  );
}
