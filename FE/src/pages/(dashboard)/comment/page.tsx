// import { useSearchParams } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import { useGetAllComment } from "./actions/useGetAll";
import { column } from "./components/column";
import { DataTable } from "./components/DataTable";
import Header from "./components/Header";

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 5;

const Comment = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, listComment, error } = useGetAllComment();

  const paginationState = {
    pageIndex: Number(searchParams.get("page")) || DEFAULT_PAGE_INDEX,
    pageSize: Number(searchParams.get("limit")) || DEFAULT_PAGE_SIZE,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Header />

      <div className="min-h-80 mt-5">
        <DataTable
          columns={column}
          data={listComment?.data}
          pagination={paginationState}
          paginationOptions={{
            onPaginationChange: (pagination) => {
              const next =
                typeof pagination === "function"
                  ? pagination(paginationState)
                  : pagination;

              setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set("page", String(next.pageIndex)); // +1 vì react-table dùng index bắt đầu từ 0
                newParams.set("limit", String(next.pageSize));
                return newParams;
              });
            },

            rowCount: listComment?.totalDocs,
          }}
        />
      </div>
    </>
  );
};

export default Comment;
