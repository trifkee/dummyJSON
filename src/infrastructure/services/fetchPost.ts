import instance from './axiosInstance'

export function fetchPost(url:string) {
    return instance({
        url:`posts/${url}`, 
        method:'GET'
    })
}