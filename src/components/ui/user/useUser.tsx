import fetcher from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

// use user is to simply fetch the user data
async function useUser() {
  const user = useQuery({
    queryKey: ['user'],
    queryFn: () => fetcher.GET('user'),
  })

  return user;
}
export default useUser;
