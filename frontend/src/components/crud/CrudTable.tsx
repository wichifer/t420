// src/components/crud/CrudTable.tsx

import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface CrudTableProps {
  children: ReactNode;
}

export function CrudTable({ children }: CrudTableProps) {
  return (
    <Card>
      <CardContent className="p-0 overflow-auto">
        {children}
      </CardContent>
    </Card>
  );
}