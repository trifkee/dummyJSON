import { useQuery } from "react-query"
import { useNavigate } from "react-router"
import  { fetchData }  from "../API/queries/fetchData"

const useFetch = (key, url) => {
    const navigate = useNavigate()
    
    const handleError = (err) => {
        if(err.response?.status === 401){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
        }
    }

    const { data, isFetching, refetch, isLoading } = useQuery({
        queryKey:[key, url],
        queryFn: () => fetchData(url),
        refetchOnWindowFocus: false,
        onError: (err) => handleError(err),
        retry: 1
    })

    return { data, isFetching, refetch, isLoading }
}

export default useFetch