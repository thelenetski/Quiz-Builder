import Link from "next/link";

export function Header() {
  return (
    <header className="w-full flex py-5">
      <Link
        href="/create"
        className="text-xl py-2 px-5 hover:underline text-amber-950"
      >
        Add Quiz
      </Link>
      <Link
        href="/quizzes"
        className="text-xl py-2 px-5 hover:underline text-amber-950"
      >
        Quiz List
      </Link>
    </header>
  );
}
