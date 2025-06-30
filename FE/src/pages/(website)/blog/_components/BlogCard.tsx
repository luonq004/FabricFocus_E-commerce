import Pagination from "@/components/Pagination";
import { Link } from "react-router-dom";
import { useGetBlog } from "../actions/useGetBlog";
import { useGetAllCategory } from "../../homepage/actions/useGetAllCategory";
import { Category } from "../../wishlist/types";

const BlogCard = () => {
  const { isLoading, data, error } = useGetBlog();
  const { isLoadingCategory, listCategory } = useGetAllCategory();

  const getCategoryLabel = (categoryId: string) => {
    const category = listCategory.find(
      (cat: Category) => cat._id === categoryId
    );
    return category ? category.name : categoryId; // Nếu không tìm thấy thì trả về giá trị ban đầu
  };

  if (isLoading || isLoadingCategory)
    return (
      <div className="text-center text-gray-500 font-semibold">
        Đang tải dữ liệu...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 font-semibold">
        {error.message}
      </div>
    );

  return (
    // <p>ád</p>
    <div>
      <div className="space-y-20 mb-10 ">
        {/* Kiểm tra nếu không có dữ liệu */}
        {data?.data.map((item) => (
          <div
            key={item._id}
            className="max-w-4xl min-w-full mx-auto overflow-hidden"
          >
            {/* Image */}
            {/* <Link to={`/blog/detail/${item._id}?category=${currentCategory}`}> */}
            <Link to={`/blog/detail/${item._id}`}>
              <img
                src={item.image}
                alt="Blog"
                className="w-full h-[500px] mb-5 rounded-lg object-cover"
              />
            </Link>

            {/* Content */}
            <div className="flex flex-col md:flex-row">
              <div className=" text-gray-500 md:text-center uppercase">
                <div className="flex flex-col">
                  <span className="text-3xl text-[#343434]">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                    })}
                  </span>
                  <span className="text-[11px]">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="md:ml-[30px]">
                <Link
                  // to={`/blog/detail/${item._id}?category=${currentCategory}`}
                  to={`/blog/detail/${item._id}`}
                >
                  <h2 className="text-xl font-raleway font-extrabold text-[#343434] mb-2 uppercase hover:text-[#b8cd06] cursor-pointer duration-200">
                    {item.title}
                  </h2>
                </Link>
                <p className="text-[13px] text-[#b8cd06] mb-4 uppercase">
                  {item.author} - {getCategoryLabel(item.category)}
                </p>

                <p className="text-[#888] text-[13px] mb-6 text-justify">
                  {item.description}
                </p>

                <div className="flex md:w-32 lg:space-x-2 space-y-3 lg:space-y-0 flex-col">
                  <Link
                    // to={`/blog/detail/${item._id}?category=${currentCategory}`}
                    to={`/blog/detail/${item._id}`}
                    className="group relative px-8  py-6 text-xs bg-[#b8cd06] text-white rounded-full font-semibold overflow-hidden"
                  >
                    {/* Text chính */}
                    <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-in-out transform group-hover:translate-x-full group-hover:opacity-0">
                      TÌM HIỂU THÊM
                    </span>
                    {/* Icon */}
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center w-full transition-all duration-200 ease-in-out transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* PAGINATION */}
        <Pagination totalCount={data!.totalItems} pageSize={data!.limit} />
      </div>
    </div>
  );
};

export default BlogCard;
