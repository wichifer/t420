// src/components/form/RHFSwitchField.tsx

import {
  useFormContext,
  Controller,
} from "react-hook-form";

import {
  SwitchField,
} from "./SwitchField";


interface Props {

  name: string;

  label?: string;

  disabled?: boolean;

}


export function RHFSwitchField({
  name,
  label,
  disabled,
}: Props) {

  const {
    control,
    formState: {
      errors,
    },
  } = useFormContext();


  return (

    <Controller

      name={name}

      control={control}

      render={({ field }) => (

        <SwitchField

          label={label}

          checked={
            field.value ?? false
          }

          disabled={
            disabled
          }

          error={
            typeof errors[name]?.message === "string"
              ? errors[name]?.message
              : undefined
          }

          onCheckedChange={
            field.onChange
          }

        />

      )}

    />

  );

}