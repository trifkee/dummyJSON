import axios from "axios"
import { useState } from "react"
import { useMutation } from "react-query"

function usePost(url, body) {

    const [posted, setPosted] = useState(false)

    const fetchData = () => {
        return axios.post(url, {...body}, {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            }
        })
    }

    const { mutate } = useMutation({
        mutationFn: fetchData,
        onSuccess: () => {
            setPosted(true)

            setTimeout(() => {
                setPosted(false)
            }, 1000)
        }
    })

    return { mutate, posted }

}

export default usePost