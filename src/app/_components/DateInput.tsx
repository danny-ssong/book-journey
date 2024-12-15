import dayjs from "dayjs";

type Props = {
  date: string;
  setDate: (date: string) => void;
};
export default function DateInput({ date, setDate }: Props) {
  const dateYYYYMM = dayjs(date).format("YYYY-MM");

  const handleChange = (date: string) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    setDate(dateString);
  };

  return (
    <div className="flex gap-4">
      <input
        className="px-4 py-1 border"
        type="month"
        value={dateYYYYMM}
        onChange={(e) => handleChange(e.target.value)}
        required
      />
    </div>
  );
}
