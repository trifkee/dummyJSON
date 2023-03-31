import instance from './axiosInstance'
import { CreatePostRequest } from '../../domain/interfaces/posts/posts'

export function mutatePost({url,body}:CreatePostRequest) {
    return instance({
        url: url,
        method:'POST',
        data: body
    })
}