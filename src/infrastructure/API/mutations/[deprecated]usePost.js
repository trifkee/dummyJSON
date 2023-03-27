import { useState } from "react"
import { useMutation } from "react-query"

function usePost(url, body, query) {

    const [posted, setPosted] = useState(false)

    const { mutate } = useMutation({
        mutationFn: () => query(url, body),
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