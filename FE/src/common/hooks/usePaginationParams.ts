// hooks/usePaginationParams.ts
import { useSearchParams } from "react-router-dom";

export function usePaginationParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  const setPage = (newPage: number) => {
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams);
  };

  const setLimit = (newLimit: number) => {
    searchParams.set("limit", String(newLimit));
    searchParams.set("page", "1"); // reset về trang đầu khi đổi limit
    setSearchParams(searchParams);
  };

  return { page, limit, setPage, setLimit };
}
