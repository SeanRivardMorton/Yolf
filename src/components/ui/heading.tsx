'use client'
import { LogOutIcon } from "lucide-react";
import { Button } from "./button";
import useUser from "./user/useUser";
import useAuth from "./login/hooks/useLogin";

function Heading(props: { children?: string }) {
  const user = useUser()
  const { logout } = useAuth()

  return <div className="flex flex-row gap-4 justify-end mr-24">
    {user && <div className="my-auto text-lg">{user.email}</div>}
    <Button onClick={() => logout()} variant="outline" size="icon"><LogOutIcon /></Button>
  </div>;
}

export default Heading
