import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-xl font-bold tracking-tighter">
        Generate your prerouted links
      </h1>
      <div className="flex gap-4">
        <Link href="/aussie" className="border rounded-xl p-4 w-1/2">
          Aussie
        </Link>
        <Link href="/lendi" className="border rounded-xl p-4 w-1/2">
          Lendi
        </Link>
      </div>
    </>
  );
}
