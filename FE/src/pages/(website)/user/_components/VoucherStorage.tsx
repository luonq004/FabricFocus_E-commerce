import { useUserContext } from "@/common/context/UserProvider";
import { useGetVoucher } from "@/common/hooks/useVouher";
import {
  IVoucherData,
  IVoucherUseage,
} from "@/pages/(dashboard)/voucher/types";
import { TicketPercent, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const VoucherStorage = () => {
  const { _id }: { _id: string | null } = useUserContext();
  const [countdowns, setCountdowns] = useState<{
    [id: string]: string;
  }>({});

  const { data, isLoading, isError } = useGetVoucher("get-all-countdown");

  const {
    data: voucherUsage,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetVoucher("get-all-usage", _id!);

  useEffect(() => {
    document.title = "Kho voucher";
  }, []);

  const intervals = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (data) {
      // Clear intervals cũ nếu có
      Object.values(intervals.current).forEach(clearInterval);
      intervals.current = {};

      data.forEach((item: IVoucherData) => {
        const present = item.countdown;
        if (item.voucher.status === "active" && present > 0) {
          startCountdown(present, item.voucher._id);
        }
      });
    }

    return () => {
      Object.values(intervals.current).forEach(clearInterval);
    };
  }, [data]);

  function startCountdown(initialTime: number, id: string) {
    let timeRemaining = initialTime;

    intervals.current[id] = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(intervals.current[id]);
        setCountdowns((prev) => ({
          ...prev,
          [id]: "Voucher đã hết hạn",
        }));
        return;
      }

      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      const countdownText = `${hours}h ${minutes}m ${seconds}s`;
      setCountdowns((prev) => ({
        ...prev,
        [id]: countdownText,
      }));

      timeRemaining -= 1000;
    }, 1000);
  }

  if (_id === null)
    return (
      <div className="max-w-[1000px] h-screen py-10 px-16 flex flex-col gap-8 mx-auto text-center">
        Bạn cần đăng nhập để xem kho voucher
      </div>
    );
  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div className="flex items-center justify-center p-[10rem] my-10   ">
        <AiOutlineExclamationCircle className="text-red-500 text-xl mr-2" />
        <span className="text-red-600 font-semibold">
          Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
        </span>
      </div>
    );
  if (isLoading2) return <div>Loading...</div>;
  if (isError2)
    return (
      <div className="flex items-center justify-center p-[10rem] my-10   ">
        <AiOutlineExclamationCircle className="text-red-500 text-xl mr-2" />
        <span className="text-red-600 font-semibold">
          Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
        </span>
      </div>
    );
  return (
    <div className="max-w-[1000px] h-screen py-10 px-16 flex flex-col gap-8 mx-auto">
      <div className="text-2xl font-bold border-b border-zinc-400 pb-3">
        <h1>Kho Voucher</h1>
      </div>
      <div className="flex flex-col h-screen overflow-y-auto gap-4">
        {data?.map((item: IVoucherData) => {
          const matchedVoucherUsage = voucherUsage?.find(
            (voucher: IVoucherUseage) => voucher.voucherId === item.voucher._id
          );
          if (
            item.voucher.status === "active" &&
            item.countdown > 0 &&
            !matchedVoucherUsage
          ) {
            return (
              <div
                key={item.voucher._id}
                className={`voucher-item p-3 w-full grid grid-cols-[68px_auto] gap-x-3 transition-all duration-200 border rounded-md border-gray-300 ${
                  matchedVoucherUsage ? "pointer-events-none relative" : ""
                }`}
              >
                <div className="bg-slate-300 flex justify-center items-center p-1">
                  {item.voucher.category === "product" ? (
                    <TicketPercent size={42} />
                  ) : (
                    <Truck size={42} />
                  )}
                </div>
                <div className="flex justify-between text-[13px] sm:text-[16px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex">
                      <div className="border-2 p-1 rounded-md border-light-400 text-light-400 text-xs">
                        <p>{item.voucher.code}</p>
                      </div>
                    </div>
                    <div>
                      <p>
                        Giảm {item.voucher.discount.toLocaleString()}
                        {item.voucher.type === "fixed" ? "đ" : "%"}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 flex gap-2 items-center">
                    <div>HSD:</div>
                    {/* <div
                      className=""
                      id={`countdown-${item.voucher._id}`}
                    ></div> */}
                    <div
                      className={`text-gray-400 ${
                        countdowns[item.voucher._id]?.includes("hết hạn")
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {countdowns[item.voucher._id] || "..."}
                    </div>
                  </div>
                </div>
                {/* //kiểm tra voucher đã sử dụng */}
                {/* <div className={`${matchedVoucherUsage ? 'absolute' : 'hidden'} w-full h-full bg-white bg-opacity-70 flex flex-col justify-center items-center text-red-500 font-semibold`}>
                                    <span className='bg-red-500 z-20 text-white text-[14px] p-2 rounded-md'>Voucher đã được sử dụng</span>
                                </div> */}
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

export default VoucherStorage;
