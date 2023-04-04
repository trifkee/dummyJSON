import instance from './axiosInstance'

export function deleteUser(url:string){
    return instance({
        url:`users/${url}`,
        method:'DELETE'
    })
}

