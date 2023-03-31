
import { useQuery } from "react-query";
import { redirect } from "react-router";
import { fetchProduct } from "../../services/fetchProduct";

export const useFetchProduct = (key:string, url:string) => {
    return useQuery({
        queryKey:[key],
        queryFn: () => fetchProduct(url),
        refetchOnWindowFocus: false,
        retry: 1,
    })
}