"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus, TriangleAlert } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

type ChatFormProps = {
  remove: (chatId: number) => void;
  chatId: number;
  prompt: string;
  response: string;
  onPromptChange: (chatId: number, prompt: string) => void;
  onResponseChange: (chatId: number, response: string) => void;
};

const formSchema = z
  .object({
    title: z.string().optional(),
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
  })
  .refine(
    (data) => {
      if (data.chats.length > 2 && !data.title) {
        return false;
      }
      return true;
    },
    {
      message: "Title is required when there are more than 2 chats.",
      path: ["title"],
    }
  );

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

    const chatToDelete = getChat(chatId);
    if (!chatToDelete) return;
    if (
      !(
        chatToDelete.prompt.trim() === "" || chatToDelete.response.trim() === ""
      )
    ) {
      toast.custom((t) => (
        <div
          className={` max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-zinc-500 p-2 items-center`}
        >
          <div className="flex items-start"></div>
          <div className="ml-3 flex-1">
            <p className="text-sm flex space-x-2 items-center font-medium text-gray-900">
              <TriangleAlert />
              <span>Confirm Action</span>
              {/* Confirm Action */}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Are you sure you want to delete this chat form?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              The action cannot be undone!
            </p>
          </div>
          <div className="space-y-2 grid ">
            <Button
              variant="outline"
              onClick={() => toast.dismiss(t.id)}
              className=""
            >
              Close
            </Button>
            <Button
              size={"sm"}
              variant="destructive"
              onClick={() => {
                form.setValue(
                  "chats",
                  chats.filter((chat) => chat.chatId !== chatId)
                );
                toast.success("Chat form shrunk");
                // remove(chatId);
                toast.dismiss(t.id);
              }}
              className=""
            >
              Delete
            </Button>
          </div>
        </div>
      ));
      return;
    }
    form.setValue(
      "chats",
      chats.filter((chat) => chat.chatId !== chatId)
    );
    toast.success("Chat form shrunk");
  };

  const dep = form.watch().chats;
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dep]);

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

          {form.getValues().chats.map((chat, index) => (
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
      <div ref={chatEndRef} />
    </div>
  );
};

export default PostForm;
