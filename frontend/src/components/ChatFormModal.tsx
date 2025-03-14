import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatForm from "./ChatForm";
import { PostType } from "@/types/Post.type";
// ------------------------
import { Copy, Pen } from "lucide-react";

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
  post: PostType;
  triggerText: string;
};

const ChatFormModal: React.FC<ChatFormModalProps> = ({ post, triggerText }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size={"icon"} className="cursor-pointer">
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent className="px-2 max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Update this chat</DialogTitle>
            <DialogDescription>
              Modify any of the input fields update and click done
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <ChatForm formPayload={post} />
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
