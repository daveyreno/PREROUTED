interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <h1 className="text-3xl font-bold tracking-tighter mb-4">{title}</h1>;
}
