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
import useAuthStore from "@/lib/store/auth.store";
import { useParams } from "next/navigation";
// import { useRouter } from "next/router";
import useAuthorStore from "@/lib/store/author.store";

const PostsListSection = () => {
  const { userName } = useParams();

  const [editTitle, setEditTitle] = useState(false);
  const [titlePayload, setTitlePayload] = useState<string>("");
  const { authUser } = useAuthStore();
  // if (!authUser) router.push("/login");
  const {
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

  const { author, handleAuthorGet, authorGetLoading } = useAuthorStore();

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
      // console.log(titlePayload);
    } catch {}
    setTitlePayload("");
    setEditTitle(false);
  };

  useEffect(() => {
    handleAuthorGet(
      { titles: true, posts: true },
      userName as string,
      undefined
    );
  }, [
    postUpdateLoading,
    titleUpdateLoading,
    postDeleteLoading,
    postCreateLoading,
    handleAuthorGet,
    userName,
  ]);

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 w-full items-center justify-center p-2">
        {authorGetLoading ? (
          [...Array(3)].map((_, index) => <PostCardSkeleton key={index} />)
        ) : (
          <div className=" space-y-8">
            {author?.titles?.map((title, index) => (
              <div className="space-y-1 flex flex-col" key={index}>
                <div className="flex gap-2 justify-center flex-wrap mx-auto">
                  {editTitle && title.authorId == authUser?.id ? (
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
                    <div className="flex-1 flex gap-2">
                      <h2
                        title={title?.title}
                        className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 bg-clip-text text-transparent to-pink-500"
                      >
                        {title?.title}
                      </h2>
                      {title.authorId == authUser?.id && (
                        <Button
                          variant="outline"
                          size={"icon"}
                          className="cursor-pointer"
                          onClick={() => handleTitleEdit(title?.title)}
                        >
                          <Pen />
                        </Button>
                      )}
                      {title.authorId == authUser?.id && (
                        <DeleteModal
                          title="Delete Post"
                          description="Are you sure you want to proceed with this action?"
                          detail="This will delete all chats of this title and action cannot be undone"
                          onClick={() => handleTitleDelete(title?.id)}
                          loading={titleDeleteLoading}
                        />
                      )}
                      {title.authorId == authUser?.id && (
                        <ChatFormModal
                          title={"Attach a new chat"}
                          description=" Create a new chat under the current title"
                          // post={chat}
                          Icon={Plus}
                          titleId={title?.id}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {title?.posts?.map((chat, index) => (
                    <div
                      className="flex-1 border rounded-lg min-w-72 p-2  max-w-4xl mx-auto"
                      key={index}
                    >
                      {title.authorId == authUser?.id && (
                        <div className="flex gap-2 justify-end">
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
                      )}
                      <ChatCard post={chat} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsListSection;
