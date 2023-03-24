import { useQuery } from "react-query";
import { fetchProducts } from "../../services/fetchProducts";

export const useFetchProducts = (key, url) => {
    return useQuery({
        queryKey:[key],
        queryFn: () => fetchProducts(url),
        refetchOnWindowFocus: false,
    })
}