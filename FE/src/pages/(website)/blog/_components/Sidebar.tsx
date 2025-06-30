import axios from "@/configs/axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Lấy và cập nhật tham số URL
  const currentCategory = searchParams.get("category");
  const [categories, setCategories] = useState<any[]>([]); // Lưu danh mục

  // const [searchQuery, setSearchQuery] = useState("");

  // Lấy danh mục từ API
  useEffect(() => {
    const fetchCategoriesAndPosts = async () => {
      try {
        // Lấy danh mục
        const categoryResponse = await axios.get("/category");
        const categoriesData = categoryResponse.data;
        setCategories([{ _id: null, name: "TẤT CẢ" }, ...categoriesData]);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchCategoriesAndPosts();
  }, []);

  // Cập nhật từ khóa tìm kiếm
  // const handleSearchChange = (e: any) => {
  //   setSearchQuery(e.target.value);
  //   searchParams.set("search", e.target.value);
  //   searchParams.set("page", "1"); // Reset trang về 1 khi tìm kiếm
  //   setSearchParams(searchParams);
  // };

  // Cập nhật danh mục
  const handleCategoryClick = (category: any) => {
    if (category) {
      searchParams.set("category", category); // Thêm category vào URL
    } else {
      searchParams.delete("category"); // Xóa category khỏi URL nếu là "TẤT CẢ"
    }
    searchParams.set("page", "1"); // Reset trang về 1
    setSearchParams(searchParams);
    if (window.location.pathname.includes("/detail")) {
      window.location.href = "/blog"; // Chuyển về trang danh sách bài viết
    }
  };

  return (
    <div className="mb-20 lg:w-80">
      <div className="flex flex-col uppercase">
        {/* Input tìm kiếm */}
        {/* <div className="mb-10 relative">
          <input
            value={searchQuery}
            onClick={handleSearchChange}
            type="text"
            placeholder="Tìm kiếm theo tên bài viết hoặc tác giả..."
            className="w-full text-xs py-3 pr-10 pl-3 border border-[#efefef] rounded-full focus:outline-none focus:ring-[#b8cd06] focus:border-transparent"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div> */}

        {/* Danh mục */}
        <div className="mb-10">
          <h3 className="mb-4 text-lg font-raleway font-extrabold uppercase text-[#343434]">
            danh mục
          </h3>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li
                key={cat._id}
                className={`text-[#888] text-[11px] font-raleway hover:text-[#b8cd06] cursor-pointer border-b border-[#efefef] pb-4 ${
                  currentCategory === cat._id ? "text-[#b8cd06] font-bold" : ""
                }`}
                onClick={() => handleCategoryClick(cat._id)}
              >
                {/* {cat.name} */}
                <Link to={cat._id ? `/blog?category=${cat._id}` : `/blog`}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
