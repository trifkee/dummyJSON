import { useState } from "react";
import { useMutation } from "react-query";
import { mutatePost } from '../../services/mutatePost'

export function useNewPost(key, url, body){

    const [posted, setPosted] = useState(false)

    return useMutation({
        queryKey: [key],
        mutationFn: () => mutatePost(url, body, posted),
    })
}