import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Item {
  id: string;
  label: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  items: Item[];
  onSelect: (item: Item) => void;
}

export function SearchModal({
  open,
  onOpenChange,
  title,
  items,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-[100dvh] p-0 rounded-none">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <Input
            autoFocus
            placeholder={`Buscar ${title.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelect(item);
                onOpenChange(false);
                setSearch("");
              }}
              className="w-full p-4 text-left border-b hover:bg-muted"
            >
              {item.label}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}