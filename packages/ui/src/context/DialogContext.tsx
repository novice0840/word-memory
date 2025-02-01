import { createContext, useContext, useState } from "react";
import Dialog from "@/components/Dialog";

interface DialogData {
  title: string;
  description: string;
  onConfirmClick: () => void;
}

interface DialogContextType {
  open: (data: DialogData) => void;
  close: () => void;
  isOpen: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [dialogData, setDialogData] = useState<DialogData | null>(null);

  const open = (data: DialogData) => {
    setDialogData(data);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setDialogData(null);
  };

  return (
    <DialogContext.Provider value={{ open, close, isOpen }}>
      {children}
      {dialogData && (
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          title={dialogData?.title}
          description={dialogData?.description}
          onConfirmClick={dialogData?.onConfirmClick}
        />
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
