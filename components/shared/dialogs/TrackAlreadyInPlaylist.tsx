import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TrackAlreadyInPlaylistProps {
  onSubmit: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TrackAlreadyInPlaylist: React.FC<TrackAlreadyInPlaylistProps> = ({
  onSubmit,
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Already added</DialogTitle>
          <DialogDescription>
            Your playlist already contain this track
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubmit} variant="outline">
            Add anyway
          </Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrackAlreadyInPlaylist;
