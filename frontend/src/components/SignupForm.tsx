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

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const { signupHandler, loadingSignUp, authUser } = useAuthStore();

  if (authUser) {
    router.push(`/user/${authUser.username}`);
  }

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    signupHandler(data).then(() => {
      form.reset();
      router.push("/login");
    });
  };

  return (
    <div className="w-full max-w-lg flex-1 mx-auto sm:mx-0 bg-accent rounded-2xl px-5 py-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9">
          <FormDescription className="sm:hidden block text-center text-2xl font-bold capitalize">
            Create an account to continue
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
                    autoComplete="on"
                    disabled={loadingSignUp}
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
                      autoComplete="on"
                      disabled={loadingSignUp}
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-5 text-zinc-500">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="on"
                    disabled={loadingSignUp}
                    type="password"
                    className="text-5 p-5"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loadingSignUp}
            type="submit"
            className="w-full mt-5 text-xl font-semibold py-5 cursor-pointer"
            variant={"default"}
          >
            {loadingSignUp ? "Loading..." : "Sign up"}
          </Button>
        </form>
      </Form>
      <div className="flex justify-center items-center text-sm mt-5 gap-2">
        <p className={`font-semibold`}>Already have an account?</p>
        <Link href="/login" className="font-semibold text-blue-500">
          login
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
