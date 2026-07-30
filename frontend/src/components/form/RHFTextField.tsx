import {
  useFormContext,
} from "react-hook-form";

import {
  TextField,
} from "./TextField";


interface Props {
  name: string;

  label?: string;

  placeholder?: string;

  type?: string;

  required?: boolean;

  disabled?: boolean;

  helperText?: string;
}


export function RHFTextField({
  name,
  ...props
}: Props) {

  const {
    register,
    formState: {
      errors,
    },
  } = useFormContext();


  const error =
    errors[name]?.message as string | undefined;


  return (
    <TextField
      {...register(name)}
      {...props}
      error={error}
    />
  );
}