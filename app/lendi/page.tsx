import Title from "@/components/common/Title";
import { LinkGen } from "@/components/generator/LinkGen";

export default function LendiGenerator() {
  return (
    <>
      <Title title="Generate Lendi pre-routed links" />
      <div className="flex gap-4">
        <LinkGen brand="lendi" />
      </div>
    </>
  );
}
