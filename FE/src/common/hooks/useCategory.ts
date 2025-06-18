import { useQuery } from "@tanstack/react-query";

import axios from "@/configs/axios";

export function useCategory() {
  const { isLoading: isLoadingCategory, data: category } = useQuery({
    queryKey: ["Category"],
    queryFn: () => axios.get("/category"),
  });

  return { category, isLoadingCategory };
}
