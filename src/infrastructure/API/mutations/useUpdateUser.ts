import { useMutation } from "react-query";
import { mutateUpdateUser } from "../../services/mutateUpdateUser";
import { UpdateUser } from "../../../domain/interfaces/user/user";

export function useUpdateUser({key, url, body}:UpdateUser){
    return useMutation({
        mutationKey:[key],
        mutationFn: () => mutateUpdateUser({url,body})
    })
}