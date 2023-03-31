import instance from './axiosInstance'

export function mutateUser(url:string, body:string) {
    return instance({
        url: url,
        method:'POST',
        data: body
    })
}