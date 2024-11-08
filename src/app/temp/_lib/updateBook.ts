import { createClient } from "@/utils/supabase/client";

export default async function updateBook(isbn: string, column: string, value: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("book")
    .update({ [column]: value })
    .eq("isbn", isbn);

  if (error) return false;

  return true;
}
