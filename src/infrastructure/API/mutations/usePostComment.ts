import { useState } from "react";
import { useMutation } from "react-query";
import { AddCommentOnPost } from "../../../domain/interfaces/posts/posts";
import { mutateComment } from '../../services/mutateComment'

export function usePostComment({key, url, body}:AddCommentOnPost){

    const [posted, setPosted] = useState(false)

    return useMutation({
        mutationKey: [key],
        mutationFn: () => mutateComment({url, body}),
    })
}