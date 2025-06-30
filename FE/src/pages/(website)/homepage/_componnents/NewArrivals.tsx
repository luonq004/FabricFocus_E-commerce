import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Category } from "../../wishlist/types";
import { useGetAllCategory } from "../actions/useGetAllCategory";
import { useGetProductByCategory } from "../actions/useGetProductByCategory";

const NewArrivals = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const swiperCategoriesRef = useRef<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  const [categorySelected, setCategorySelected] = useState<string>("");
  const { listProduct } = useGetProductByCategory(categorySelected);

  const { isLoadingCategory, listCategory } = useGetAllCategory();

  useEffect(() => {
    if ((swiperRef.current && listProduct?.data?.length) || [].length > 0) {
      swiperRef.current!.slideTo(0); // Đặt Swiper về slide đầu tiên
    }
  }, [listProduct]);

  useEffect(() => {
    if (swiperCategoriesRef.current) {
      requestAnimationFrame(() => {
        swiperCategoriesRef.current!.update();
        setIsBeginning(swiperCategoriesRef.current!.isBeginning);
        setIsEnd(swiperCategoriesRef.current!.isEnd);
      });
    }
  }, [isLoadingCategory]);

  // chuyển sản phẩm
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <div className="mx-auto pt-10 lg:pt-32">
      {/* Tiêu đề phần */}
      <div className="text-center md:mb-20">
        <h5 className="text-sm uppercase text-gray-500 font-questrial tracking-wider mb-3">
          SẢN PHẨM MỚI
        </h5>
        <h2 className="text-3xl sm:text-4xl text-[#343434] font-raleway font-extrabold">
          THỜI TRANG MỚI DÀNH CHO BẠN
        </h2>
        <div className="flex items-center gap-1 justify-center my-6">
          <span className="h-[1px] w-2 bg-[#b8cd06] mb-2"></span>
          <span className="h-[1px] w-12 bg-[#b8cd06] mb-2"></span>
          <span className="h-[1px] w-2 bg-[#b8cd06] mb-2"></span>
        </div>
      </div>

      {/* Menu danh mục */}
      <div className="relative w-full">
        {/* Nút Prev */}
        {!isBeginning && (
          <button
            className="absolute left-0 xs:left-[2%] md:left-[8%] top-1/2 -translate-y-1/2 z-10 px-2"
            onClick={() => swiperCategoriesRef.current!.slidePrev()}
          >
            <CircleChevronLeft className="text-[#b8cd06]" />
          </button>
        )}

        <Swiper
          onSwiper={(swiper) => {
            swiperCategoriesRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          loop={false}
          spaceBetween={0}
          className="w-full md:w-[80%] mb-5 lg:mb-16"
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            590: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 4,
            },
            950: {
              slidesPerView: 5,
            },
            1199: {
              slidesPerView: 6,
            },
            1340: {
              slidesPerView: 7,
            },
            1490: {
              slidesPerView: 8,
            },
            1800: {
              slidesPerView: 9,
            },
          }}
        >
          <SwiperSlide className="flex justify-center">
            <div className="flex items-center mb-1">
              <button
                className={`px-4 py-1 mx-2 text-sm whitespace-nowrap font-semibold transition-all duration-300 uppercase text-center ${
                  categorySelected == ""
                    ? "bg-[#b8cd06] text-white rounded-full"
                    : "text-gray-500 hover:shadow rounded-full"
                }`}
                onClick={() => setCategorySelected("")}
              >
                tất cả
              </button>
            </div>
          </SwiperSlide>

          {listCategory?.map(
            (category: Category, index: number) =>
              !category.defaultCategory && (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="flex items-center mb-1">
                    <button
                      className={`px-4 py-1 mx-2 text-sm whitespace-nowrap font-semibold transition-all duration-300 uppercase text-center ${
                        category._id === categorySelected
                          ? "bg-[#b8cd06] text-white rounded-full"
                          : "text-gray-500 hover:shadow rounded-full"
                      }`}
                      onClick={() => setCategorySelected(category._id)}
                    >
                      {category.name}
                    </button>
                  </div>
                </SwiperSlide>
              )
          )}
        </Swiper>

        {/* Nút Next */}
        {!isEnd && (
          <button
            className="absolute right-0 xs:right-[2%] md:right-[8%] top-1/2 -translate-y-1/2 z-10"
            onClick={() => swiperCategoriesRef.current!.slideNext()}
          >
            <CircleChevronRight className="text-[#b8cd06]" />
          </button>
        )}
      </div>

      {/* Slider sản phẩm */}
      <div className="relative h-[445px] text-center">
        {/* Mũi tên cuộn trái */}
        <button
          onClick={handlePrev}
          className="absolute hidden lg:flex left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 border-[5px] border-zinc-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Container cuộn sản phẩm */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop={false}
          touchRatio={1}
          centerInsufficientSlides={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {listProduct?.data.map((product, index) => (
            <SwiperSlide
              key={index}
              className="relative bg-white border cursor-grab p-4 min-w-[100%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[25%] xl:min-w-[20%] max-w-[250px] group overflow-hidden"
            >
              {/* Nhãn giảm giá */}
              {product.priceSale ? (
                <span className="absolute top-5 left-6 text-xs text-white py-1 px-2 rounded-full bg-red-500">
                  GIẢM GIÁ
                </span>
              ) : (
                ""
              )}

              <div className="mt-10 mb-5">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[250px] object-contain"
                  />
                </Link>
              </div>

              {/* Phần nút hiển thị khi hover */}

              <div>
                <h3 className="font-extrabold font-raleway text-[13px] text-inherit group-hover:text-[#b8cd06] mb-3 text-wrap relative transition-all duration-300 top-0 group-hover:top-[-3px] line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3  duration-200 text-wrap line-clamp-1">
                  {product.description}
                </p>

                <div className="flex flex-col h-[43px]">
                  {product.priceSale && product.priceSale > 0 ? (
                    <>
                      {/* Giá sale */}
                      <span className="text-[18px] text-red-600 font-bold">
                        {product.priceSale.toLocaleString("vi-VN")} VNĐ
                      </span>
                      {/* Giá gốc gạch ngang */}
                      <span className="text-xs text-gray-400 line-through">
                        {product.price.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </>
                  ) : (
                    /* Chỉ hiển thị giá gốc nếu không có giá sale */
                    <span className="text-[18px] text-red-600 font-bold">
                      {product.price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mũi tên cuộn phải */}
        <button
          onClick={handleNext}
          className="absolute hidden lg:flex right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 border-[5px] border-zinc-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-gray-500"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
