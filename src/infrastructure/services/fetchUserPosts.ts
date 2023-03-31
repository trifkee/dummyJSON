import instance from './axiosInstance'

export function fetchUserPosts(url:string) {
    return instance({
        url:`posts/user/${url}`,
        method:'GET'
    })
}