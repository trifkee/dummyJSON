import { useQuery } from "react-query";
import { fetchProducts } from "../../services/fetchProducts";

export const useFetchProducts = (key:string, url:string) => {
    return useQuery({
        queryKey:[key],
        queryFn: () => fetchProducts(url),
        refetchOnWindowFocus: false,
        retry:1,
        enabled: false,
    })    
}