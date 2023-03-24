import { useQuery } from "react-query";
import { fetchProduct } from "../../services/fetchProduct";

export const useFetchProduct = (key, url) => {
    return useQuery({
        queryKey:[key],
        queryFn: () => fetchProduct(url),
        refetchOnWindowFocus: false,
        retry: 1,
    })
}