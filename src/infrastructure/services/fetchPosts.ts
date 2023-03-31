import instance from './axiosInstance'

export function fetchPosts(url:string) {
    return instance({
        url:`posts${url}`,
        method:'GET'
    })   
}