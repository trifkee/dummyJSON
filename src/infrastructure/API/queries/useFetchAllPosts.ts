import { useQuery } from "react-query";
import { redirect } from "react-router";
import { fetchPosts } from "../../services/fetchPosts";

export const useFetchAllPosts = (key:string, url:string) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchPosts(url),
        refetchOnWindowFocus: false,
    })
}