import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Level } from "@/types/word";
import { setLocalStorage } from "@/hooks/useLocalStorage";

interface ResetDialogProps {
  level: Level;
}

const ResetDialog = ({ level }: ResetDialogProps) => {
  const handleResetClick = () => {
    setLocalStorage(level, { memoryList: [], curIndex: 0 });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>초기화</Button>
      </DialogTrigger>
      <DialogContent className="w-64 rounded">
        <DialogHeader>
          <DialogTitle>{level} 단어장 초기화</DialogTitle>
          <DialogDescription>정말로 초기화하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={handleResetClick} type="button">
              초기화
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ResetDialog;
