import Title from "@/components/common/Title";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Title title="Pre-Routed Links" />
      <div className="flex gap-2">
        <Link
          href="/aussie"
          className="border rounded-xl p-4 w-1/2 flex justify-center hover:bg-slate-100 transition-all duration-300"
        >
          Aussie
        </Link>
        <Link
          href="/lendi"
          className="border rounded-xl p-4 w-1/2 flex justify-center hover:bg-slate-100 transition-all duration-300"
        >
          Lendi
        </Link>
      </div>
    </>
  );
}
