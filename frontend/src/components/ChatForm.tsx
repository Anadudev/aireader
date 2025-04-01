"use client";
import React from "react";
import { Button } from "@/components/ui/button";
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
import { PostType } from "@/types";
import TipTapRichText from "@/components/TipTapRichText";

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

const ChatForm = ({
  formUpdatePayload,
  titleId,
}: {
  formUpdatePayload?: PostType;
  titleId?: string;
}) => {
  const emptyPayload = {
    id: "",
    prompt: "",
    response: "",
  };
  const {
    handlePostUpdate,
    postUpdateLoading,
    postCreateLoading,
    handlePostCreate,
  } = usePostStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chat: formUpdatePayload || emptyPayload,
    },
  });

  const handleSubmit = () => {
    try {
      const formValues = form.getValues();
      const chat = formValues.chat;
      if (formUpdatePayload) {
        handlePostUpdate(chat).then(() => {
          form.reset();
        });
      } else {
        if (titleId)
          handlePostCreate({
            titleId: titleId,
            // authorId: formCreatePayload?.authorId,
            chats: [{ prompt: chat.prompt, response: chat.response }],
          }).then(() => {
            form.reset();
          });
        console.log(titleId);
      }

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
                    <TipTapRichText
                      setValue={field.onChange}
                      value={field.value}
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
                    <TipTapRichText
                      setValue={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={postUpdateLoading} className="w-full" type="submit">
            {formUpdatePayload
              ? postUpdateLoading
                ? "Updating..."
                : "Update"
              : postCreateLoading
              ? "Creating..."
              : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatForm;
