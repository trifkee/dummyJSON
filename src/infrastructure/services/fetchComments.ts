import instance from './axiosInstance'

export function fetchComments(url:string) {
        return instance({
            url:`posts/${url}/comments`,
            method:'GET'
        })
}