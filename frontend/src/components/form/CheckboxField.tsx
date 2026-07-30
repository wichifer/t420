import { Checkbox } from "@/components/ui/checkbox";

import { Field } from "./Field";

interface Props {
  label: string;

  checked?: boolean;

  helperText?: string;

  error?: string;

  disabled?: boolean;

  onCheckedChange?(checked: boolean): void;
}

export function CheckboxField({
  label,
  checked,
  helperText,
  error,
  disabled,
  onCheckedChange,
}: Props) {
  return (
    <Field
      helperText={helperText}
      error={error}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
        />

        <span className="text-sm">
          {label}
        </span>
      </div>
    </Field>
  );
}