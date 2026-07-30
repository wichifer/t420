//src/components/modals/GlobalModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useModalStore }
  from "@/store/modalStore";

export default function GlobalModal() {
  const {
    open,
    title,
    description,
    content,
    onClose,
  } = useModalStore();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}