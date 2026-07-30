// src/components/form/TextField.tsx

import {
  forwardRef,
} from "react";

import { Input } from "@/components/ui/input";

import { Field } from "./Field";


interface Props
 extends React.InputHTMLAttributes<HTMLInputElement> {

  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}


export const TextField = forwardRef<
  HTMLInputElement,
  Props
>(
  (
    {
      label,
      error,
      required,
      helperText,
      ...props
    },
    ref
  ) => {

    return (
      <Field
        label={label}
        error={error}
        required={required}
        helperText={helperText}
      >
        <Input
          ref={ref}
          {...props}
        />
      </Field>
    );
  }
);


TextField.displayName =
  "TextField";