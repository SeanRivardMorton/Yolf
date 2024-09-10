'use client'
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../button";
import { Card, CardHeader } from "../card";
import { Input } from "../input";
import useAuth from "../login/hooks/useLogin";
import { Credentials, loginSchema } from "../login/schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Note: A thought I have, about this useAuth hook, is if it would be better to
// include react-hook-form login in it. Instead of fitting everything together
// all the time. Maybe I should try that next time I roll out authentication.
//
// Overall, I'm finding that implementing basic auth is.. much easier than I thought.
function SignupForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { signup } = useAuth();
  const form = useForm<Credentials>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await signup(data);

    if (response.status !== 200) {
      form.setError('password', {
        type: 'manual',
        message: 'Signup failed'
      });
      return
    }

    router.push('/');
    toast({
      title: "Signup successful",
      description: "You have successfully signed up",
    })
  });

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-4 border-white flex flex-col gap-4 p-12 w-[400px] rounded-lg">
        <CardHeader className="text-4xl text-center">Yolf</CardHeader>
        <Controller name="email" control={form.control} render={({ field }) => (
          <Input {...field} className="" type="text" placeholder="Username" />
        )} />
        <ErrorMessage errors={form.formState.errors} name="email" />
        <Controller name="password" control={form.control} render={({ field }) => (
          <Input {...field} type="password" placeholder="Password" />
        )} />
        <ErrorMessage errors={form.formState.errors} name="password" />
        <Button className="border-white border-4" type="submit">Signup</Button>
        <div className="flex flex-row justify-center">
          OR
        </div>
        <Link href="/login" className="mx-auto underline">Log in</Link>
      </Card>
    </form>
  );
}

export default SignupForm;

