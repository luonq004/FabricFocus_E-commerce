import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

interface StatusMenuProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}
const statuses = [
  "chờ xác nhận",
  "đã xác nhận",
  "đang giao hàng",
  "đã hoàn thành",
  "hủy đơn",
];

const StatusMenu = ({ selectedStatus, onStatusChange }: StatusMenuProps) => {
  const swiperCategoriesRef = useRef<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  useEffect(() => {
    if (swiperCategoriesRef.current) {
      requestAnimationFrame(() => {
        swiperCategoriesRef.current!.update();
        setIsBeginning(swiperCategoriesRef.current!.isBeginning);
        setIsEnd(swiperCategoriesRef.current!.isEnd);
      });
    }
  }, []);

  return (
    <div className="py-4 mt-4 lg:mt-0 relative">
      {/* <div className="flex space-x-6"> */}
      {!isBeginning && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2"
          onClick={() => swiperCategoriesRef.current!.slidePrev()}
        >
          <CircleChevronLeft className="text-[#b8cd06]" />
        </button>
      )}

      <Swiper
        className="w-[67%] md:w-[85%] lg:w-full"
        onSwiper={(swiper) => {
          swiperCategoriesRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onResize={(swiper) => {
          swiper.update();
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        loop={false}
        spaceBetween={0}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          767: {
            slidesPerView: 4,
          },
          991: {
            slidesPerView: 5,
          },
        }}
      >
        {statuses.map((status) => (
          <SwiperSlide className="flex" key={status}>
            <div
              key={status}
              className={`cursor-pointer text-sm xl:text-lg font-semibold ${
                selectedStatus === status
                  ? "border-b-2 border-red-500"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => onStatusChange(status)}
            >
              {status}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}
      {/* Nút Next */}
      {!isEnd && (
        <button
          className="absolute right-0 xs:right-[2%] md:right-[8%] top-1/2 -translate-y-1/2 z-10 px-2"
          onClick={() => swiperCategoriesRef.current!.slideNext()}
        >
          <CircleChevronRight className="text-[#b8cd06]" />
        </button>
      )}
    </div>
  );
};

export default StatusMenu;
