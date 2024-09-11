import UserAvatar from "./user/avatar";

function Heading(props: { children?: string }) {
  return <>
    <UserAvatar />
    <h1>User</h1>
  </>;
}

export default Heading
