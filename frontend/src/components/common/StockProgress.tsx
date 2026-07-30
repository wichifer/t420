import { Progress } from "@/components/ui/progress";

interface Props {
  actual: number;
  minimo: number;
}

export default function StockProgress({
  actual,
  minimo,
}: Props) {

  const porcentaje =
    Math.min((actual / (minimo * 2)) * 100, 100);

  return (
    <Progress
      value={porcentaje}
      className="mt-2"
    />
  );
}