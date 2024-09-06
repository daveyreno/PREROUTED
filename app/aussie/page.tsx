import { LinkGen } from "@/components/generator/LinkGen";

export default function AussieGenerator() {
  return (
    <>
      <h1 className="text-xl font-bold tracking-tighter">
        Generate your Aussie Broker Links
      </h1>
      <div className="flex gap-4">
        <LinkGen brand="aussie" />
      </div>
    </>
  );
}
