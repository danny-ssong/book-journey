import dayjs from "dayjs";

type Props = {
  date: string;
  setDate: (date: string) => void;
};
export default function MonthPicker({ date, setDate }: Props) {
  const dateYYYYMM = dayjs(date).format("YYYY-MM");

  const handleChange = (date: string) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    setDate(dateString);
  };

  return (
    <input
      className="rounded-lg border px-2 py-1"
      type="month"
      value={dateYYYYMM}
      onChange={(e) => handleChange(e.target.value)}
      required
    />
  );
}
