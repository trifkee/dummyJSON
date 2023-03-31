import instance from './axiosInstance'
export function fetchUsers() {
    return instance({
        url:'users',
        method:"GET"
    })  
}