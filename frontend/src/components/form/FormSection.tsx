// src/components/form/FormSection.tsx

import type { ReactNode } from "react";


interface Props {
  title?: string;
  description?: string;
  children: ReactNode;
}


export function FormSection({
  title,
  description,
  children,
}: Props) {

  return (
    <section className="space-y-5">

      {(title || description) && (
        <div className="border-b pb-3">

          {title && (
            <h3 className="text-base font-semibold">
              {title}
            </h3>
          )}

          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}

        </div>
      )}

      {children}

    </section>
  );
}