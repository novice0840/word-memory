import { Button } from "shared/ui";
import {
  Dialog as DialogPrimitive,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "shared/ui";

interface DialogProps {
  title: string;
  description: string;
  onConfirmClick: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialog = ({
  title,
  description,
  onConfirmClick,
  open,
  onOpenChange,
}: DialogProps) => {
  return (
    <DialogPrimitive open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-80 rounded">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={onConfirmClick} type="button" className="w-full">
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogPrimitive>
  );
};
export default Dialog;
