import instance from './axiosInstance'

export function fetchCategories() {
    return instance({
        url:'products/categories',
        method:'GET'
    })
}