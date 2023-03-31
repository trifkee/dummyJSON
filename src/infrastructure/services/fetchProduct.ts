import instance from './axiosInstance'

export function fetchProduct(url:string) {
    return instance({
        url:`products/${url}`,
        method:'GET'
    })
}