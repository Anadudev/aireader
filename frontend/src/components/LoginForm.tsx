"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const { loginHandler, loadingLogin, authUser } = useAuthStore();

  if (authUser) {
    router.push(`/user/${authUser.username}`);
  }

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    loginHandler(data).then(() => {
      form.reset();
    });
  };

  return (
    <div className="w-full max-w-lg flex-1 mx-auto sm:mx-0 bg-accent rounded-2xl px-5 py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <FormDescription className="text-center text-2xl font-bold capitalize">
            Welcome back
          </FormDescription>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-5 font-semibold text-zinc-500">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loadingLogin}
                    className="text-5 p-5"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-5 text-zinc-500">Password</FormLabel>
                <FormControl className="relative">
                  <div className="">
                    <Input
                      disabled={loadingLogin}
                      type={showPassword ? "text" : "password"}
                      className="text-5 p-5"
                      placeholder="Password"
                      {...field}
                    />
                    {showPassword ? (
                      <Eye
                        onClick={toggleShowPassword}
                        className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                      />
                    ) : (
                      <EyeClosed
                        onClick={toggleShowPassword}
                        className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loadingLogin}
            type="submit"
            className="w-full mt-5 text-xl font-semibold py-5 cursor-pointer"
            variant={"default"}
          >
            {loadingLogin ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="flex justify-center text-sm mt-5 space-x-2">
        <p className={`font-semibold`}>Don&apos;t have an account yet?</p>
        <Link href="/signup" className="font-semibold text-blue-500">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
