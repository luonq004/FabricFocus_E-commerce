// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/App.css";

const SlideShow = () => {
  return (
    <>
      <Swiper
        breakpoints={{
          1200: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        spaceBetween={30}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center hover:cursor-move">
            <img
              className="max-w-[415px] w-full rounded-xl"
              src="/images/thumbnail-35.jpg"
              alt="thum_35"
            />
            <div className="Content max-w-[415px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <h6 className="uppercase font-bold">
                Chiếc thuyền bây giờ đã đi
              </h6>
              <div className="text-[#888] text-sm">
                Tôi cũng rất buồn và bóng rổ. Bệnh tật hay bệnh tật không cần
                chăm sóc dễ dàng. Dịch vụ khách hàng phải luôn đi trước xe cộ
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center">
            <img
              className="max-w-[415px] w-full rounded-xl"
              src="/images/thumbnail-36.jpg"
              alt="thum_36"
            />
            <div className="Content max-w-[415px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <h6 className="uppercase font-bold">
                Tôi sẽ không trở thành nhân viên của điền trang, cũng không phải
                người giám sát
              </h6>
              <div className="text-[#888] text-sm">
                Tôi cũng rất buồn và bóng rổ. Bệnh tật hay bệnh tật không cần
                chăm sóc dễ dàng. Dịch vụ khách hàng phải luôn đi trước xe cộ
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center">
            <img
              className="max-w-[415px] w-full rounded-xl"
              src="/images/thumbnail-37.jpg"
              alt="thum_37"
            />
            <div className="Content max-w-[415px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <h6 className="uppercase font-bold">
                Tôi sẽ không trở thành nhân viên của điền trang, cũng không phải
                người giám sát
              </h6>
              <div className="text-[#888] text-sm">
                Tôi cũng rất buồn và bóng rổ. Bệnh tật hay bệnh tật không cần
                chăm sóc dễ dàng. Dịch vụ khách hàng phải luôn đi trước xe cộ
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center">
            <img
              className="max-w-[415px] w-full rounded-xl"
              src="/images/thumbnail-35.jpg"
              alt="thum_35"
            />
            <div className="Content max-w-[415px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <h6 className="uppercase font-bold">
                Chiếc thuyền bây giờ đã đi
              </h6>
              <div className="text-[#888] text-sm">
                Tôi cũng rất buồn và bóng rổ. Bệnh tật hay bệnh tật không cần
                chăm sóc dễ dàng. Dịch vụ khách hàng phải luôn đi trước xe cộ
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center">
            <img
              className="max-w-[415px] w-full rounded-xl"
              src="/images/thumbnail-36.jpg"
              alt="thum_36"
            />
            <div className="Content max-w-[415px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <h6 className="uppercase font-bold">
                Tôi sẽ không trở thành nhân viên của điền trang, cũng không phải
                người giám sát
              </h6>
              <div className="text-[#888] text-sm">
                Tôi cũng rất buồn và bóng rổ. Bệnh tật hay bệnh tật không cần
                chăm sóc dễ dàng. Dịch vụ khách hàng phải luôn đi trước xe cộ
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SlideShow;
