import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { IBlogResponse } from "../types";
import { getAllBlog } from "./api";

export function useGetBlog() {
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page") ?? "1";
  const categoryParam = searchParams.get("category") ?? "";

  const { isLoading, data, error } = useQuery<IBlogResponse, Error>({
    queryKey: ["Blog", pageParam, categoryParam],
    queryFn: () => getAllBlog({ _page: pageParam, _category: categoryParam }),
    placeholderData: keepPreviousData,
  });

  return { isLoading, data, error };
}
