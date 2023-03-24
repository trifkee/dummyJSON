import { useQuery } from "react-query";
import { fetchCategories } from "../../services/fetchCategories";

export const useFetchCategories = (key) => {
    return useQuery({
        queryKey: [key],
        queryFn: () => fetchCategories(),
        refetchOnWindowFocus: false,
    })
}