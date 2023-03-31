import { useQuery } from "react-query";
import { fetchPost } from '../../services/fetchPost'

export const useFetchPost = (key:string, url:string) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchPost(url),
        refetchOnWindowFocus: false,
    })
}