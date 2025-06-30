import { useParams } from "react-router-dom";
import { useGetBlogById } from "../actions/useGetBlogById";
import { Skeleton } from "@/components/ui/skeleton";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, data, error } = useGetBlogById(id!);

  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="space-y-28 mb-10 ">
      {/* Chi tiết bài viết */}
      <div className="max-w-4xl mx-auto overflow-hidden">
        <p className="text-[11px] flex items-center gap-3 text-gray-500 uppercase mb-3">
          <span>
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </span>
          <span className="text-[#b8cd06]">
            {/* {data?.author} - {data?.categoryName} */}
            {data?.author}
          </span>
        </p>

        <h2 className="text-[25px] font-raleway font-extrabold text-[#343434] uppercase mb-6">
          {data?.title}
        </h2>
        <div>
          <img
            src={data?.image}
            alt="Blog"
            className="w-full mb-5 object-cover"
          />
        </div>

        <p className="text-[#272626] text-[15px] text-justify">
          {data?.description}
        </p>

        {/* Nội dung bài viết */}
        <div
          className="detail text-md mb-4"
          dangerouslySetInnerHTML={{ __html: data!.content }}
        />
      </div>
    </div>
  );
};

export default Detail;
