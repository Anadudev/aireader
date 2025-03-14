import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatForm from "./ChatForm";
import { PostType } from "@/types/Post.type";
// ------------------------
import { Copy, LucideIcon, Pen } from "lucide-react";

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

type ChatFormModalProps = {
  post?: PostType;
  title: string;
  description: string;
  Icon: LucideIcon;
  titleId?: string;
};

const ChatFormModal: React.FC<ChatFormModalProps> = ({
  post,
  title,
  description,
  Icon,
  titleId,
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size={"icon"} className="cursor-pointer">
            <Icon />
          </Button>
        </DialogTrigger>
        <DialogContent className="px-2 max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <ChatForm formUpdatePayload={post} titleId={titleId} />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatFormModal;
