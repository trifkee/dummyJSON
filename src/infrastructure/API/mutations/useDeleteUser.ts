import { useMutation } from "react-query"
import { deleteUser } from "../../services/deleteUser"

export const useDeleteUser = (url:string, key:string) => {
    return useMutation({
        mutationKey: [key],
        mutationFn: () => deleteUser(url),
    })
}

