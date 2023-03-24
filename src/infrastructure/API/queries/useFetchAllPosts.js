import { useQuery } from "react-query";
import { fetchPosts } from "../../services/fetchPosts";

export const useFetchAllPosts = (key, url) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchPosts(url),
        refetchOnWindowFocus: false,
    })
}