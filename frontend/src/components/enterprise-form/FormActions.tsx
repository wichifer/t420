import { Button } from "@/components/ui/button";

interface FormActionsProps {
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export function FormActions({
  loading = false,
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelLabel}
        </Button>
      )}

      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? "Guardando..." : submitLabel}
      </Button>
    </div>
  );
}