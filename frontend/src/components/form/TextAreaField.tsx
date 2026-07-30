import { forwardRef } from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { Field } from "./Field";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(
  (
    {
      label,
      required,
      helperText,
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Field
        label={label}
        required={required}
        helperText={helperText}
        error={error}
      >
        <Textarea
          ref={ref}
          className={cn(
            error && "border-destructive",
            className
          )}
          {...props}
        />
      </Field>
    );
  }
);

TextAreaField.displayName = "TextAreaField";