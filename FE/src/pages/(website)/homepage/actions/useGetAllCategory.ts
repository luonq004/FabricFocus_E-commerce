import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../product/actions/api";

export function useGetAllCategory() {
  const {
    isLoading: isLoadingCategory,
    data: listCategory,
    error,
  } = useQuery({
    queryKey: ["AllCategory"],
    queryFn: () => getAllCategory(),
  });

  return { isLoadingCategory, listCategory, error };
}
