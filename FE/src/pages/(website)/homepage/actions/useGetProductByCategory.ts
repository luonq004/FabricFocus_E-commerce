import { useQuery } from "@tanstack/react-query";
import { getProductByCategoryId } from "./api";
import { ProductItem } from "../../cart/types";

interface IProductResponse {
  data: ProductItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export function useGetProductByCategory(categoryId: string) {
  const {
    isLoading,
    data: listProduct,
    error,
  } = useQuery<IProductResponse, Error>({
    queryKey: ["ProductListByCategory", categoryId],
    queryFn: () => getProductByCategoryId(categoryId),
  });

  return { isLoading, listProduct, error };
}
