// src/components/crud/EntityActions.tsx

import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EntityActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;

  viewDisabled?: boolean;
  editDisabled?: boolean;
  deleteDisabled?: boolean;
}

export function EntityActions({
  onView,
  onEdit,
  onDelete,
  viewDisabled,
  editDisabled,
  deleteDisabled,
}: EntityActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">

      {onView && (
        <Button
          size="icon"
          variant="ghost"
          disabled={viewDisabled}
          onClick={onView}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}

      {onEdit && (
        <Button
          size="icon"
          variant="ghost"
          disabled={editDisabled}
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}

      {onDelete && (
        <Button
          size="icon"
          variant="ghost"
          disabled={deleteDisabled}
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

    </div>
  );
}