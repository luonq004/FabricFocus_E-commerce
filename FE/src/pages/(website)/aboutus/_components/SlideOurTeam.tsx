// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "@/App.css";

import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const SlideOurTeam = () => {
  return (
    <>
      <Swiper
        breakpoints={{
          1200: {
            slidesPerView: 4,
          },
          991: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center group">
            <div className="grid place-items-center border border-[#eee] w-full hover:cursor-move">
              <img
                className="transition duration-300 filter grayscale hover:filter-none"
                src="/images/thumbnail-40.jpg"
                alt="thum_40"
              />
            </div>
            <div className="Content relative max-w-[300px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <div className="Desc group-hover:scale-0 transition-all duration-200 flex flex-col gap-y-3 items-center">
                <div className="text-xs text-[#b8cd06] uppercase">
                  co-founder
                </div>
                <div className="text-base font-bold uppercase">
                  Vi Quốc Lương
                </div>
                <div className="text-base text-[#888]">
                  luongvqph33533@fpt.edu.vn
                </div>
              </div>
              <div className="Info transition-all duration-500 absolute opacity-0 group-hover:opacity-100 top-1/3 group-hover:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-x-4 *:hover:cursor-pointer *:transition-all *:duration-200">
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Facebook size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Twitter size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Linkedin size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Instagram size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Youtube size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center group">
            <div className="grid place-items-center border border-[#eee] -mr-[1px] w-full hover:cursor-move">
              <img
                className="transition duration-300 filter grayscale hover:filter-none"
                src="/images/thumbnail-41.jpg"
                alt="thum_41"
              />
            </div>
            <div className="Content relative max-w-[300px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <div className="Desc group-hover:scale-0 transition-all duration-200 flex flex-col gap-y-3 items-center">
                <div className="text-xs text-[#b8cd06] uppercase">
                  co-founder
                </div>
                <div className="text-base font-bold uppercase">
                  Đoàn Thị Thu Hằng
                </div>
                <div className="text-base text-[#888]">
                  hangdttph33534@fpt.edu.vn
                </div>
              </div>
              <div className="Info transition-all duration-500 absolute opacity-0 group-hover:opacity-100 top-1/3 group-hover:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-x-4 *:hover:cursor-pointer *:transition-all *:duration-200">
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Facebook size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Twitter size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Linkedin size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Instagram size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Youtube size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center group">
            <div className="grid place-items-center border border-[#eee] -mr-[1px] w-full hover:cursor-move">
              <img
                className="transition duration-300 filter grayscale hover:filter-none"
                src="/images/thumbnail-42.jpg"
                alt="thum_42"
              />
            </div>
            <div className="Content relative max-w-[300px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <div className="Desc group-hover:scale-0 transition-all duration-200 flex flex-col gap-y-3 items-center">
                <div className="text-xs text-[#b8cd06] uppercase">
                  co-founder
                </div>
                <div className="text-base font-bold uppercase">
                  Đỗ Trọng Khanh
                </div>
                <div className="text-base text-[#888]">
                  khanhdtph33535@fpt.edu.vn
                </div>
              </div>
              <div className="Info transition-all duration-500 absolute opacity-0 group-hover:opacity-100 top-1/3 group-hover:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-x-4 *:hover:cursor-pointer *:transition-all *:duration-200">
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Facebook size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Twitter size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Linkedin size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Instagram size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Youtube size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center group">
            <div className="grid place-items-center border border-[#eee] -mr-[1px] w-full hover:cursor-move">
              <img
                className="transition duration-300 filter grayscale hover:filter-none"
                src="/images/thumbnail-43.jpg"
                alt="thum_43"
              />
            </div>
            <div className="Content relative max-w-[300px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <div className="Desc group-hover:scale-0 transition-all duration-200 flex flex-col gap-y-3 items-center">
                <div className="text-xs text-[#b8cd06] uppercase">
                  co-founder
                </div>
                <div className="text-base font-bold uppercase">Bùi Văn Hải</div>
                <div className="text-base text-[#888]">
                  haibvph33536@fpt.edu.vn
                </div>
              </div>
              <div className="Info transition-all duration-500 absolute opacity-0 group-hover:opacity-100 top-1/3 group-hover:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-x-4 *:hover:cursor-pointer *:transition-all *:duration-200">
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Facebook size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Twitter size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Linkedin size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Instagram size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Youtube size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-y-6 items-center group">
            <div className="grid place-items-center border border-[#eee] -mr-[1px] w-full hover:cursor-move">
              <img
                className="transition duration-300 filter grayscale hover:filter-none"
                src="/images/thumbnail-40.jpg"
                alt="thum_35"
              />
            </div>
            <div className="Content relative max-w-[300px] text-[13px] lg:text-[16px] flex flex-col gap-y-[18px]">
              <div className="Desc group-hover:scale-0 transition-all duration-200 flex flex-col gap-y-3 items-center">
                <div className="text-xs text-[#b8cd06] uppercase">
                  co-founder
                </div>
                <div className="text-base font-bold uppercase">
                  Ngô Tân Hoàng Minh
                </div>
                <div className="text-base text-[#888]">
                  minhnthph33537@fpt.edu.vn
                </div>
              </div>
              <div className="Info transition-all duration-500 absolute opacity-0 group-hover:opacity-100 top-1/3 group-hover:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center gap-x-4 *:hover:cursor-pointer *:transition-all *:duration-200">
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Facebook size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Twitter size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Linkedin size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Instagram size={16} />
                  </Link>
                </div>
                <div className="flex bg-[#f7f7f7] hover:bg-[#b8cd06] hover:text-white w-9 h-9 justify-center items-center rounded-3xl">
                  <Link to="">
                    <Youtube size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SlideOurTeam;
