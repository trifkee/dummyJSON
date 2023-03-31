import { useQuery } from "react-query";
import { fetchUsers } from '../../services/fetchUsers'

export const useFetchUsers = (key:string) => {
    return useQuery({
        queryKey:[key],
        queryFn: () => fetchUsers(),
        refetchOnWindowFocus:false,
        retry: 1
    })
}