import SearchInput from "@/components/common/SearchInput";
import AppSelect from "@/components/form/AppSelect";

import {
  Card,
  CardContent,
} from "@/components/ui/card";


interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  tipo: string;
  onTipoChange: (value: string) => void;
}


export default function StockFilters({
  search,
  onSearchChange,
  tipo,
  onTipoChange,
}: Props) {

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row">

        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Buscar producto, código o referencia..."
        />


        <div className="w-full md:w-64">

          <AppSelect
            value={tipo}
            onChange={onTipoChange}
            options={[
              {
                value: "TODOS",
                label: "Todos",
              },
              {
                value: "ENTRADA",
                label: "🟢 Entrada",
              },
              {
                value: "SALIDA",
                label: "🔴 Salida",
              },
            ]}
          />

        </div>

      </CardContent>
    </Card>
  );
}