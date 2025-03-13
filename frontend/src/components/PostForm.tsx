"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
// import { usePathname } from "next/navigation";
// import { Form } from "@/components/ui/form";
// import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import PostDeleteToast from "./PostDeleteToast";
import usePostStore from "@/lib/store/post.store";
import useTitleStore from "@/lib/store/title.store";

const formSchema = z.object({
  title: z.string().min(15, {
    message: "Title must be at least 15 characters.",
  }),
  chats: z.array(
    z.object({
      chatId: z.number(),
      prompt: z.string().min(2, {
        message: "Prompt must be at least 2 characters.",
      }),
      response: z.string().min(50, {
        message: "Response must be at least 50 characters.",
      }),
    })
  ),
});

const PostForm = () => {
  const chatData = { chatId: 0, prompt: "", response: "" };
  const chatEndRef = React.useRef<HTMLDivElement | null>(null);
  const [trigger, setTrigger] = React.useState(false);
  const { handlePostCreate, postCreateLoading } = usePostStore();
  const { titleCreateLoading, handleTitleCreate } = useTitleStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      chats: [chatData],
    },
  });

  const getChat = (chatId: number) => {
    const chats = form.getValues().chats;
    const chat = chats.find((chat) => chat.chatId === chatId);
    return chat ? chat : null;
  };

  const getLastChat = () => {
    const chats = form.getValues().chats;
    const lastChat = chats[chats.length - 1];
    return lastChat ? lastChat : null;
  };

  const addMoreChatForm = () => {
    const lastChat = getLastChat();
    const chats = form.getValues().chats;
    if (
      !lastChat ||
      lastChat.prompt.trim() === "" ||
      lastChat.response.trim() === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const newChat = { ...chatData, chatId: lastChat.chatId + 1 };
    form.setValue("chats", [...chats, newChat]);
    toast.success("Chat form extended");
    setTrigger(!trigger);
    scrollToBottom();
    // console.log(form.getValues().chats);
  };

  const removeChat = (chatId: number) => {
    const chats = form.getValues().chats;
    if (!chats[1]) {
      toast.error("Last chat cannot be removed");
      return;
    }
    const filteredChat = chats.filter((chat) => chat.chatId !== chatId);

    // for the custom deletion modal
    const remove = () => {
      form.setValue("chats", filteredChat);
      toast.success("Chat form shrunk");
      // remove(chatId);
      // toast.dismiss(t.id);
      setTrigger(!trigger);
    };

    const chatToDelete = getChat(chatId);
    // console.log(chatToDelete);
    if (!chatToDelete) return;
    if (
      !(
        chatToDelete.prompt.trim() === "" || chatToDelete.response.trim() === ""
      )
    ) {
      toast.custom((t) => <PostDeleteToast t={t} onCLick={() => remove()} />);
      return;
    }
    form.setValue("chats", filteredChat);
    toast.success("Chat form shrunk");
    setTrigger(!trigger);
  };

  const scrollToBottom = () =>
    chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });

  const dep = form.watch().chats;
  React.useEffect(() => {
    // scrollToBottom();
  }, [dep]);

  // console.log(form.watch().chats);

  const handleSubmit = () => {
    try {
      const formValues = form.getValues();
      const chats = formValues.chats;
      handleTitleCreate({ title: formValues.title })?.then((response) =>
        handlePostCreate({ titleId: response.id, chats })?.then(() => {
          form.reset();
        })
      );
      console.log(formValues.chats);
      // toast.success("Ai Chat posted");
    } catch {}
  };

  return (
    <div className="min-h-98 space-y-4 max-w-2xl flex-1 p-4 py-8 border border-zinc-200 rounded-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>AI post title:</FormLabel>
                <FormControl>
                  <Input
                    disabled={postCreateLoading || titleCreateLoading}
                    {...field}
                    placeholder="Chat title"
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.getValues().chats.map((chat, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-end items-center w-full">
                <Button
                  disabled={postCreateLoading || titleCreateLoading}
                  onClick={() => removeChat(chat.chatId)}
                  className="cursor-pointer"
                  variant="destructive"
                  type="button"
                >
                  <Minus />
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`chats.${index}.prompt`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input
                        disabled={postCreateLoading || titleCreateLoading}
                        {...field}
                        placeholder={`Enter your prompt "${index + 1}"`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`chats.${index}.response`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={postCreateLoading || titleCreateLoading}
                        className="w-full h-96 p-2 "
                        {...field}
                        placeholder={`Enter your response for prompt "${
                          index + 1
                        }"`}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <div className="flex gap-2 items-center justify-end">
            <Button
              disabled={postCreateLoading || titleCreateLoading}
              onClick={addMoreChatForm}
              className="cursor-pointer"
              variant={"outline"}
            >
              <Plus /> More chat
            </Button>
            <Button type="submit" className="cursor-pointer">
              Generate
            </Button>
          </div>
        </form>
      </Form>
      <Button
        disabled={postCreateLoading || titleCreateLoading}
        onClick={scrollToBottom}
        variant={"outline"}
        size={"icon"}
        className="fixed rounded-full bottom-36 right-3"
      >
        <ChevronDown />
      </Button>
      <div ref={chatEndRef} />
    </div>
  );
};

export default PostForm;
