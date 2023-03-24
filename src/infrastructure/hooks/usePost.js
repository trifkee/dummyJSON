import { useState } from "react"
import { useMutation } from "react-query"
import { postData } from "../API/mutations/postData"

function usePost(url, body) {

    const [posted, setPosted] = useState(false)

    const { mutate } = useMutation({
        mutationFn: () => postData(url, body),
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