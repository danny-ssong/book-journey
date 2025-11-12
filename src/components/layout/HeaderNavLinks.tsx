import Link from "next/link";

export default function HeaderNavLinks() {
  return (
    <nav>
      <ul className="flex gap-10 text-nowrap">
        <li>
          <Link href="/">홈</Link>
        </li>
        <li>
          <Link href="/feed">피드</Link>
        </li>
      </ul>
    </nav>
  );
}
