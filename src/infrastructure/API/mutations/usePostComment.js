import { useState } from "react";
import { useMutation } from "react-query";
import { mutateComment } from '../../services/mutateComment'

export function usePostComment(key, url, body){

    const [posted, setPosted] = useState(false)

    return useMutation({
        queryKey: [key],
        mutationFn: () => mutateComment(url, body, posted),
    })
}