import { useQuery } from "@tanstack/react-query";
import { IBlog } from "../types";
import { getBlogById } from "./api";

export function useGetBlogById(id: string) {
  const { isLoading, data, error } = useQuery<IBlog, Error>({
    queryKey: ["Blog", id],
    queryFn: () => getBlogById(id),
  });

  return { isLoading, data, error };
}
