import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

// use user is to simply fetch the user data
function useUser() {
  const user = useQuery({
    queryKey: ['user'],
    queryFn: () => fetcher.GET('user'),
  })

  console.log('hook', user)

  return user.data?.user;
}

export default useUser;
