import { useQuery } from "react-query";
import { fetchComments } from '../../services/fetchComments'

export const useFetchComments = (key, url) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchComments(url)
    })
}