// src/components/form/Field.tsx

import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import {
  ErrorMessage,
} from "./ErrorMessage";


interface FieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
}


export function Field({
  label,
  required,
  error,
  helperText,
  children,
  className,
}: FieldProps) {

  return (
    <div className={cn("space-y-2", className)}>

      {label && (
        <Label className="text-sm font-medium">
          {label}

          {required && (
            <span className="ml-1 text-destructive">
              *
            </span>
          )}

        </Label>
      )}


      {children}


      {error ? (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">
          {helperText}
        </p>
      ) : null}

    </div>
  );
}