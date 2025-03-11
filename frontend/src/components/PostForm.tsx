"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Minus, Plus, TriangleAlert } from "lucide-react";
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

const formSchema = z.object({
  title: z.string().min(15, {
    message: "Title must ,be at least 15 characters.",
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
    form.setValue("chats", chats.concat(newChat));
    toast.success("Chat form extended");
    // console.log(form.getValues().chats);
  };

  const removeChat = (chatId: number) => {
    const chats = form.getValues().chats;
    if (!chats[1]) {
      toast.error("Last chat cannot be removed");
      return;
    }
    const remove = () => {
      form.setValue(
        "chats",
        chats.filter((chat) => chat.chatId !== chatId)
      );
      toast.success("Chat form shrunk");
      // remove(chatId);
      toast.dismiss(t.id);
    };

    const chatToDelete = getChat(chatId);
    if (!chatToDelete) return;
    if (
      !(
        chatToDelete.prompt.trim() === "" || chatToDelete.response.trim() === ""
      )
    ) {
      toast.custom((t) => <PostDeleteToast t={t} onCLick={() => remove()} />);
      return;
    }
    form.setValue(
      "chats",
      chats.filter((chat) => chat.chatId !== chatId)
    );
    toast.success("Chat form shrunk");
  };

  const scrollToBottom = () =>
    chatEndRef?.current?.scrollIntoView({ behavior: "smooth" });

  // const dep = form.watch().chats;
  // React.useEffect(() => {}, [dep]);

  // console.log(form.watch().chats);

  const handleSubmit = () => {
    toast.success("Ai Chat posted");
    console.log(form.getValues().chats);
  };

  return (
    <div className="min-h-98 space-y-4 max-w-2xl flex-1 p-4 py-8 border border-zinc-200 rounded-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <div className="">
                <Input {...field} placeholder="Chat title" className="" />
              </div>
            )}
          />

          {form.getValues().chats.map((chat) => (
            <div key={chat.chatId} className="space-y-4">
              <div className="flex justify-end items-center w-full">
                <Button
                  onClick={() => removeChat(chat.chatId)}
                  className="cursor-pointer"
                  variant="destructive"
                >
                  <Minus />
                </Button>
              </div>
              <FormField
                control={form.control}
                name={`chats.${chat.chatId}.prompt`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Enter your prompt "${chat.chatId + 1}"`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`chats.${chat.chatId}.response`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full h-96 p-2 "
                        {...field}
                        placeholder={`Enter your response for prompt "${
                          chat.chatId + 1
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
