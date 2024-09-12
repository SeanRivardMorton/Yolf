'use client'
import { useToast } from "@/hooks/use-toast";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../button";
import { Card, CardHeader } from "../card";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import useAuth from "./hooks/useLogin";
import { Credentials, loginSchema } from "./schema";

function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth();
  const form = useForm<Credentials>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await login(data);

    if (response.status !== 200) {
      form.setError('password', {
        type: 'manual',
        message: 'Login failed'
      });

      return
    }

    router.push('/');
    toast({
      title: "Login successful",
      description: "You have successfully logged in",
    })
  });

  const [isPasswordShown, setIsPasswordShown] = React.useState('password');

  const showPassword = () => {
    setIsPasswordShown(isPasswordShown === 'password' ? 'text' : 'password');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-4 border-white flex flex-col gap-4 p-12 w-[400px] rounded-lg">
        <CardHeader className="text-4xl text-center">Yolf</CardHeader>
        <Controller name="email" control={form.control} render={({ field }) => (
          <Input {...field} className="" type="text" placeholder="Username" />
        )} />
        <ErrorMessage errors={form.formState.errors} name="email" />
        <div className="flex flex-row gap-4">
          <Controller name="password" control={form.control} render={({ field }) => (
            <Input {...field} type={isPasswordShown} placeholder="Password" />
          )} />
          <Button type="button" variant="outline" size="icon" className="w-1/4" onClick={showPassword}><EyeIcon className="" /></Button>
        </div>
        <ErrorMessage errors={form.formState.errors} name="password" />
        <Button className="border-white border-4" type="submit">Log in</Button>
        <div className="flex flex-row align-middle justify-end gap-4">
          <label htmlFor="rememberMe">Remember me</label>
          <Checkbox className="my-auto" {...form.register('rememberMe')} />
        </div>
        <div className="flex flex-row justify-center">
          OR
        </div>
        <Link href="/login" className="mx-auto underline">Sign Up</Link>
      </Card>
    </form>
  );

}

export default LoginForm;
