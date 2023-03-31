import { useState } from "react";
import { useMutation } from "react-query";
import { mutatePost } from '../../services/mutatePost'

import { CreatePostRequest } from '../../../domain/interfaces/posts/posts'

export function useNewPost({key, url, body}: CreatePostRequest){

    const [posted, setPosted] = useState(false)

    return useMutation({
        mutationKey: [key],
        mutationFn: () => mutatePost({url, body}), 
        onSuccess:() => console.log('success'),
        onError: () => console.log('Error')
    })
}