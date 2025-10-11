import dayjs from "dayjs";

type Props = {
  date: Date;
  setDate: (date: Date) => void;
};
export default function MonthPicker({ date, setDate, ...props }: Props) {
  const dateYYYYMM = dayjs(date).format("YYYY-MM");

  const handleChange = (date: string) => {
    const dateString = dayjs(date).toDate();
    setDate(dateString);
  };

  return (
    <input
      className="rounded-lg border px-2 py-1"
      type="month"
      value={dateYYYYMM}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={(e) => e.preventDefault()}
      {...props}
    />
  );
}
