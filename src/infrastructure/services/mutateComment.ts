import { AddCommentOnPost } from '../../domain/interfaces/posts/posts'
import instance from './axiosInstance'

export function mutateComment({url, body}:AddCommentOnPost) {
    return instance({
        url: url,
        method:'POST',
        data: body
    })
}