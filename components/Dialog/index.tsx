import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog as DialogWrapper,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogProps {
  cancelButtonText?: string;
  description?: string;
  onSubmit: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  submitButtonText?: string;
  title: string;
}

const Dialog: React.FC<DialogProps> = ({
  cancelButtonText = "Cancel",
  description,
  onSubmit,
  open,
  setOpen,
  submitButtonText = "Submit",
  title,
}) => {
  return (
    <DialogWrapper open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="bg-green-primary"
            onClick={onSubmit}
            variant="outline"
          >
            {submitButtonText}
          </Button>
          <Button onClick={() => setOpen(false)}>{cancelButtonText}</Button>
        </DialogFooter>
      </DialogContent>
    </DialogWrapper>
  );
};

export default Dialog;
