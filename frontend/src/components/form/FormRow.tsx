// src/components/form/FormRow.tsx

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  columns?: 1 | 2 | 3;
}


export function FormRow({
  children,
  columns = 2,
}: Props) {


  const classes =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";


  return (
    <div
      className={`grid gap-4 ${classes}`}
    >
      {children}
    </div>
  );
}