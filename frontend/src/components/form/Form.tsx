// src/components/form/Form.tsx

import type {
  ReactNode,
  FormHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";


interface Props
  extends Omit<
    FormHTMLAttributes<HTMLFormElement>,
    "onSubmit"
  > {

  children: ReactNode;

  onSubmit?: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;

}


export function Form({
  children,
  className,
  onSubmit,
  ...props
}: Props) {

  return (
    <form
      className={cn(
        "space-y-6",
        className
      )}

      onSubmit={onSubmit}

      {...props}
    >
      {children}
    </form>
  );
}