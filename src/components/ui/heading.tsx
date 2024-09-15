'use client'
import { LogOutIcon } from "lucide-react";
import { Button } from "./button";
import useUser from "./user/useUser";
import useAuth from "./login/hooks/useLogin";

function Heading(props: { children?: string }) {
  const { logout } = useAuth()

  return <div>
  </div>;
}

export default Heading
