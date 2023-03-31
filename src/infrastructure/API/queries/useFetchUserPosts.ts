import { useQuery } from "react-query";
import { fetchUserPosts } from "../../services/fetchUserPosts";

export const useFetchUserPosts = (key:string, url:string) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchUserPosts(url),
        refetchOnWindowFocus: false,
        retry: 1,
    })
}