import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface AppSelectProps {
  value: string;
  placeholder?: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function AppSelect({
  value,
  placeholder,
  options,
  onChange,
}: AppSelectProps) {

  return (

    <Select
      value={value}
      onValueChange={onChange}
    >

      <SelectTrigger className="w-full">

        <SelectValue
          placeholder={placeholder}
        />

      </SelectTrigger>

      <SelectContent className="min-w-[var(--radix-select-trigger-width)]">

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

  );

}