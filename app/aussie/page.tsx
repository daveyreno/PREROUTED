import Title from "@/components/common/Title";
import { LinkGen } from "@/components/generator/LinkGen";

export default function AussieGenerator() {
  return (
    <>
      <Title title="Generate Aussie pre-routed links" />
      <div className="flex gap-4">
        <LinkGen brand="aussie" />
      </div>
    </>
  );
}
