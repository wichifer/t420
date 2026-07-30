import { Badge } from "@/components/ui/badge";

interface Props {
    tipo: string;
}

export default function MovementTypeBadge({
    tipo,
}: Props) {

    switch (tipo) {

        case "ENTRADA":
            return <Badge>Entrada</Badge>;

        case "SALIDA":
            return (
                <Badge variant="destructive">
                    Salida
                </Badge>
            );

        default:
            return (
                <Badge variant="secondary">
                    Ajuste
                </Badge>
            );
    }

}