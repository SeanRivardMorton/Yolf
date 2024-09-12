import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
