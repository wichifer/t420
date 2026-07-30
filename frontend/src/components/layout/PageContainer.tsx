import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: Props) {
  return (
    <main className="p-6">
      {children}
    </main>
  );
}