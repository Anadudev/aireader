"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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
import usePostStore from "@/lib/store/post.store";
import { PostType } from "@/types/Post.type";

const formSchema = z.object({
  chat: z.object({
    id: z.string(),
    prompt: z.string().min(2, {
      message: "Prompt must be at least 2 characters.",
    }),
    response: z.string().min(50, {
      message: "Response must be at least 50 characters.",
    }),
  }),
});

const ChatForm = ({ formPayload }: { formPayload: PostType }) => {
  const { handlePostUpdate, postUpdateLoading } = usePostStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chat: formPayload,
    },
  });

  const handleSubmit = () => {
    try {
      const formValues = form.getValues();
      const chat = formValues.chat;
      handlePostUpdate(chat).then(() => {
        form.reset();
      });

      console.log(formValues.chat);
      // toast.success("Ai Chat posted");
    } catch {}
  };

  return (
    <div className="space-y-4 h-full max-w-4xl flex-1 p-4 py-8 border border-zinc-200 rounded-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-9">
          <div className="space-y-4 h-full">
            <FormField
              name={"chat.prompt"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      disabled={postUpdateLoading}
                      className="max-h-40 p-2 "
                      {...field}
                      placeholder={`Enter your prompt response`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"chat.response"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      disabled={postUpdateLoading}
                      className="max-h-40 p-2 "
                      {...field}
                      placeholder={`Enter your prompt response`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={postUpdateLoading} className="w-full" type="submit">
            {postUpdateLoading ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
