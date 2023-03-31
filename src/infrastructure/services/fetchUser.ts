import instance from './axiosInstance'

export function fetchUser(url:string) {
    return instance({
        url:`users/${url}`,
        method:"GET"
    })
}