import instance from "./axiosInstance";
import { UpdateUser } from '../../domain/interfaces/user/user'

export function mutateUpdateUser({url, body}:UpdateUser){
    return instance({
        url,
        method:'PATCH',
        data:body
    })
}