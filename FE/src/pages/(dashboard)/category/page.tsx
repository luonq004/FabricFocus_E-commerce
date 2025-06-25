import { useGetAllCategory } from "./actions/useGetAllCategory";
import { DataTable } from "./components/DataTable";
import Header from "./components/Header";
import { columnCategories } from "./components/columnCategories";

const CategotiesPage = () => {
  const { isLoading, listCategory, error } = useGetAllCategory();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center w-full uppercase text-2xl">
        Xảy ra lỗi, vui lòng kiểm tra lại
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-80 mt-5">
        <DataTable columns={columnCategories} data={listCategory} />
      </div>
    </>
  );
};

export default CategotiesPage;
