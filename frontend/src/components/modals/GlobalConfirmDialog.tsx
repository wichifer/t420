import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useConfirmStore } from "@/store/confirmStore";

export default function GlobalConfirmDialog() {
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    variant,
    loading,
    onConfirm,
    setLoading,
    closeConfirm,
  } = useConfirmStore();

  const handleConfirm = async () => {
    if (!onConfirm) return;

    try {
      setLoading(true);

      await onConfirm();

      closeConfirm();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value && !loading) {
          closeConfirm();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel disabled={loading}>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            variant={
              variant === "destructive"
                ? "destructive"
                : "default"
            }
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
          >
            {loading
              ? "Procesando..."
              : confirmText}
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}