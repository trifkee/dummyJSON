import { useQuery } from "react-query";
import { fetchComments } from '../../services/fetchComments'

export const useFetchComments = (key:string, url:string) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchComments(url)
    })
}