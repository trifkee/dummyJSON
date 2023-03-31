import { useQuery } from "react-query";
import { fetchUser } from '../../services/fetchUser'

export const useFetchUser = (key:string, url:string) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchUser(url),
        refetchOnWindowFocus: false,
        retry:1,
    })
}