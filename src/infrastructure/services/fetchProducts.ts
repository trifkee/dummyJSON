import instance from './axiosInstance'

export function fetchProducts(url:string) {
    return instance({
        url:`${url}`,
        method:"GET"
    })    
}