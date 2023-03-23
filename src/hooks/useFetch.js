import { useQuery } from "react-query"
import axios from "axios"
import { useNavigate } from "react-router"

const useFetch = (key, url) => {
    const navigate = useNavigate()
    
    const handleError = (err) => {
        console.log(err.response.status)
        if(err.response.status === 401){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
        }
    }

    const { data, isFetching, refetch, isLoading } = useQuery({
        queryKey:[key, url],
        queryFn: () => {
            return axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                    'Content-Type': 'application/json'
                }
            })
        },
        refetchOnWindowFocus: false,
        onError: (err) => handleError(err),
        retry: 1
    })

    return { data, isFetching, refetch, isLoading }
}

export default useFetch