import { Switch } from "@/components/ui/switch";

import { Field } from "./Field";

interface Props {
  label?: string;

  checked?: boolean;

  helperText?: string;

  error?: string;

  disabled?: boolean;

  onCheckedChange?(checked: boolean): void;
}

export function SwitchField({
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
      <div className="flex items-center justify-between rounded-md border p-3">
        <span className="text-sm font-medium">
          {label}
        </span>

        <Switch
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}
        />
      </div>
    </Field>
  );
}