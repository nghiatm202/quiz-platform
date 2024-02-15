import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Link href="/quiz" className="w-full">
        <Button className="w-full">Start Quiz</Button>
      </Link>
    </div>
  );
}
