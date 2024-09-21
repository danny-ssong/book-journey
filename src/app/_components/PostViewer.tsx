import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { Database, Tables, Enums } from "@/types/database.types";

type Props = {
  book: any;
  post: Tables<"posts">;
};

export default function PostViewer({ book, post }: Props) {
  const supabase = createClient();

  return (
    <div className="flex flex-col gap-4">
      <p>{book.id}</p>
      <div className="flex justify-between">
        <div>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                className={`${starValue > post.rating! ? "text-gray-300" : "text-yellow-400"} cursor-pointer text-3xl`}
                key={index}
              >
                &#9733;
              </span>
            );
          })}
        </div>
        <div className="flex gap-4">
          <input type="date" value={dayjs(post.startDate).format("YYYY-MM-DD")} />
          <input type="date" value={dayjs(post.endDate).format("YYYY-MM-DD")} />
        </div>
      </div>
      <p className="w-full h-12 placeholder:text-gray-400 placeholder:text-2xl  text-black text-2xl font-semibold resize-none overflow-hidden border-b-2 border-gray-500">
        {post.title}
      </p>
      <p className="w-full h-[800px] resize-none text-black">{post.content!}</p>
    </div>
  );
}
