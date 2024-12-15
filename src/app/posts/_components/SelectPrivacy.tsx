import React from "react";

type Props = {
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
};

export default function SelectPrivacy({ isPrivate, setIsPrivate }: Props) {
  return (
    <select
      value={String(isPrivate)}
      onChange={(e) => setIsPrivate(e.target.value === "true")}
      className="border px-2 py-1"
    >
      <option value="true">비공개</option>
      <option value="false">공개</option>
    </select>
  );
}
