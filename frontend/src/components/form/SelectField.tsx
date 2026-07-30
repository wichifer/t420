// C:\dev\ordenes-saas-frontend\src\components\form\SelectField.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field } from "./Field";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;

  value?: string;

  placeholder?: string;

  disabled?: boolean;

  options: Option[];

  onValueChange?(value: string): void;
}

export function SelectField({
  label,
  required,
  helperText,
  error,
  value,
  placeholder = "Seleccionar...",
  disabled,
  options,
  onValueChange,
}: SelectFieldProps) {
  return (
    <Field
      label={label}
      required={required}
      helperText={helperText}
      error={error}
    >
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}