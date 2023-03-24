import { useQuery } from "react-query";
import { fetchPost } from '../../services/fetchPost'

export const useFetchPost = (key, url) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchPost(url),
        refetchOnWindowFocus: false,
    })
}