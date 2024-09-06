import { LinkGen } from "@/components/generator/LinkGen";

export default function LendiGenerator() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tighter">
        Generate your Lendi Broker Links
      </h1>
      <div className="flex gap-4">
        <LinkGen brand="lendi" />
      </div>
    </>
  );
}
