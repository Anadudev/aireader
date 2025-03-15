"use client";
import React, { useEffect, useState } from "react";
import useTitleStore from "@/lib/store/title.store";
import PostCardSkeleton from "@/components/loading/skeleton/PostCardSkeleton";
import ChatCard from "@/components/ChatCard";
import ChatFormModal from "@/components/ChatFormModal";
import usePostStore from "@/lib/store/post.store";
import { Button } from "@/components/ui/button";
import { Pen, Plus, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import DeleteModal from "@/components/DeleteModal";

const PostsListSection = () => {
  const [editTitle, setEditTitle] = useState(false);
  const [titlePayload, setTitlePayload] = useState<string>("");
  const {
    titles,
    handleTitlesGet,
    titleGetLoading,
    handleTitleUpdate,
    titleUpdateLoading,
    titleDeleteLoading,
    handleTitleDelete,
  } = useTitleStore();
  const {
    postUpdateLoading,
    handlePostDelete,
    postDeleteLoading,
    postCreateLoading,
  } = usePostStore();

  const handleTitleEdit = (title: string) => {
    setEditTitle(true);
    setTitlePayload(title);
  };

  const handleTitleOnSubmit = (id: string, title: string) => {
    try {
      if (titlePayload === "" || titlePayload.trim() === "") {
        toast.error("Title cannot be empty");
        return;
      }
      if (title !== titlePayload)
        handleTitleUpdate({ id, title: titlePayload });
      setTitlePayload("");
      setEditTitle(false);
      console.log(titlePayload);
    } catch {}
    setTitlePayload("");
    setEditTitle(false);
  };

  useEffect(() => {
    handleTitlesGet({ posts: true });
  }, [
    handleTitlesGet,
    postUpdateLoading,
    titleUpdateLoading,
    postDeleteLoading,
    postCreateLoading,
  ]);

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 w-full items-center justify-center p-2">
        {titleGetLoading &&
          [...Array(3)].map((_, index) => <PostCardSkeleton key={index} />)}
        <div className=" space-y-8">
          {titles?.map((title, index) => (
            <div className="space-y-1" key={index}>
              <div className="flex gap-2 justify-center flex-wrap">
                {editTitle ? (
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="text"
                      className=""
                      disabled={titleUpdateLoading}
                      onChange={(e) => setTitlePayload(e.target.value)}
                      value={titlePayload}
                      defaultValue={title?.title}
                    />
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      size={"icon"}
                      onClick={() =>
                        handleTitleOnSubmit(title?.id, title?.title)
                      }
                    >
                      <Save />
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 flex gap-2 flex-wrap-reverse">
                    <h2
                      title={title?.title}
                      className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500"
                    >
                      {title?.title}
                    </h2>
                    <Button
                      variant="outline"
                      size={"icon"}
                      className="cursor-pointer"
                      onClick={() => handleTitleEdit(title?.title)}
                    >
                      <Pen />
                    </Button>
                    <DeleteModal
                      title="Delete Post"
                      description="Are you sure you want to proceed with this action?"
                      detail="This will delete all chats of this title and action cannot be undone"
                      onClick={() => handleTitleDelete(title?.id)}
                      loading={titleDeleteLoading}
                    />
                    <ChatFormModal
                      title={"Attach a new chat"}
                      description=" Create a new chat under the current title"
                      // post={chat}
                      Icon={Plus}
                      titleId={title?.id}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {title?.posts?.map((chat, index) => (
                  <div
                    className="flex-1 border rounded-lg min-w-72 p-2"
                    key={index}
                  >
                    <div className="flex gap-2">
                      <DeleteModal
                        title="Delete Chat"
                        description="Are you sure you want to delete this chat?"
                        detail="This will delete only this one chat and action cannot be undone"
                        onClick={() => handlePostDelete(chat?.id)}
                        loading={postDeleteLoading}
                      />
                      <ChatFormModal
                        title={"Update this chat"}
                        description=" Modify any of the input fields update and click done"
                        post={chat}
                        Icon={Pen}
                      />
                    </div>
                    <ChatCard post={chat} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsListSection;
