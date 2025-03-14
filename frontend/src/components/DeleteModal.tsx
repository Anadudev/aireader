import React from "react";
import { Copy, Trash2, TriangleAlert } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ChatDeleteModalProps = {
  title: string;
  description: string;
  detail: string;
  onClick: () => void;
  loading: boolean;
};

const DeleteModal: React.FC<ChatDeleteModalProps> = ({
  title,
  description,
  detail,
  onClick,
  loading,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer" size={"icon"}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TriangleAlert className="text-red-500" />
            <p className="">{title}</p>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">{detail}</div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={loading}
              className="cursor-pointer"
              type="button"
              onClick={onClick}
              variant="secondary"
            >
              {loading ? "Deleting..." : "Proceed"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
