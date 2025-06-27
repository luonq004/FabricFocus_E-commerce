import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllComment } from "./api";
import { useSearchParams } from "react-router-dom";

export function useGetAllComment() {
  const [searchParams] = useSearchParams();

  // Filter
  const statusDisplay = searchParams.get("status");

  // Page
  const pageNumber = searchParams.get("page");

  // Limit
  const limitResponse = searchParams.get("limit");

  const filterStatus =
    !statusDisplay || statusDisplay === "" || statusDisplay == null
      ? "display"
      : statusDisplay;

  const filterPage = !pageNumber ? 1 : +pageNumber;

  const filterLimit = !limitResponse ? 5 : +limitResponse;

  const {
    isLoading,
    data: listComment,
    error,
  } = useQuery({
    queryKey: [
      "Comments",
      { status: filterStatus, page: filterPage, limit: filterLimit },
    ],
    queryFn: () =>
      getAllComment({
        status: filterStatus,
        page: filterPage,
        limit: filterLimit,
      }),
    placeholderData: keepPreviousData,
  });

  return { isLoading, listComment, error };
}
