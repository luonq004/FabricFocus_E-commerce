//icons
import vnpay from "@/assets/icons/vnpay-logo.svg";

//other
import { useUserContext } from "@/common/context/UserProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import axios from "@/configs/axios";
import { formatCurrency } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Ticket } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ActionType, CartResponse } from "../types";
import CountdownVoucher from "./CountdownVoucher";

const formSchema = z.object({
  voucherCode: z.string().min(0, {
    message: "Không hợp lệ",
  }),
});

const CartRight = ({
  cart,
  userAction,
}: {
  cart: CartResponse;
  userAction: (action: ActionType) => void;
}) => {
  const { _id }: { _id: string | null } = useUserContext();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      voucherCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    userAction({ type: "applyVoucher", value: values });
  }

  function handleApplyVoucher(item: string) {
    userAction({ type: "applyVoucher", value: { voucherCode: item } });
  }

  function handleRemoveVoucher(item: string) {
    userAction({ type: "removeVoucher", value: { voucherCode: item } });
  }

  async function lastCheck() {
    if (cart?.voucher?.length > 0) {
      for (const item of cart.voucher) {
        const { data } = await axios.get(`voucher/get-one/${item._id}`);
        if (data?.status === "inactive") {
          toast({
            variant: "destructive",
            title: "Lỗi voucher",
            description: `Voucher "${item.code}" đã ngưng hoạt động. Vui lòng chọn voucher khác hoặc gỡ bỏ voucher này.`,
          });
          return; // Chặn luồng và không cho phép navigate
        }
        if (
          new Date().getTime() >=
          new Date(
            new Date(data?.endDate).getTime() - 7 * 60 * 60 * 1000
          ).getTime()
        ) {
          toast({
            variant: "destructive",
            title: "Lỗi voucher",
            description: `Voucher "${item.code}" đã hết hạn. Vui lòng chọn voucher khác hoặc gỡ bỏ voucher này.`,
          });
          return;
        }
        if (data?.countOnStock === 0) {
          toast({
            variant: "destructive",
            title: "Lỗi voucher",
            description: `Voucher "${item.code}" đã hết số lượng. Vui lòng chọn voucher khác hoặc gỡ bỏ voucher này.`,
          });
          return;
        }
      }
    }

    if (cart?.products?.every((item) => item.selected === false)) {
      return; // Chặn nếu không có sản phẩm nào được chọn
    }

    navigate("/cart/checkout");
  }

  return (
    <div className="Cart__Right">
      <div className="flex flex-col gap-6 border border-[#F4F4F4] rounded-[16px] p-6">
        <div className="Subtotal flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
              Tổng tiền hàng
            </p>
            <p className="">
              <span>{formatCurrency(cart?.subTotal ?? 0)} VNĐ</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
              Giảm giá
            </p>
            <p className="">
              <span>
                {cart?.discount > 0 ? `- ${formatCurrency(cart.discount)}` : 0}{" "}
                VNĐ
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
              Phí giao hàng
            </p>
            <div>
              <span>{formatCurrency(30000)}VNĐ</span>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
              Thành tiền
            </p>
            <div>
              <span>{formatCurrency(cart?.total ?? 0)}VNĐ</span>
            </div>
          </div>
        </div>
        {_id && (
          <Dialog>
            <DialogTrigger asChild>
              <div>
                <Button
                  variant="outline"
                  className="w-full p-2 rounded-md bg-slate-200 grid grid-cols-[30px_auto_20px] justify-normal"
                >
                  <div className="items-start">
                    <Ticket />
                  </div>
                  <div className="text-start truncate">
                    {cart?.voucher?.length > 0
                      ? cart?.voucher?.map((item) => item.code)?.join(", ")
                      : "Chọn hoặc nhập Voucher"}
                  </div>
                  <div className="items-end">
                    <ChevronRight />
                  </div>
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Voucher của bạn</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="Code-Sale flex items-start justify-between gap-4"
                  >
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="voucherCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Mã giảm giá..."
                                className="w-full"
                                {...field}
                              />
                            </FormControl>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                    </div>
                    <button
                      className="py-3 px-5 rounded-full text-light-400 text-[14px] bg-light-50 whitespace-nowrap cursor-pointer transition-all duration-300 hover:bg-light-100 select-none"
                      type="submit"
                    >
                      Áp dụng
                    </button>

                    <FormMessage />
                  </form>
                </Form>
                <CountdownVoucher
                  onApplyVoucher={handleApplyVoucher}
                  onRemoveVoucher={handleRemoveVoucher}
                  cart={cart}
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
        <hr />
        {/* ${cart?.products?.every((item: any) => item.selected === false) ? '' : 'checkout'} */}
        <div onClick={() => lastCheck()} className="Checkout cursor-pointer">
          {/* <Link to={`${cart?.products?.every((item: any) => item.selected === false) ? '' : 'checkout'}`}> */}
          <div
            className={`bg-[#C8C9CB] ${
              cart?.products?.every((item) => item.selected === false)
                ? "cursor-not-allowed"
                : "bg-light-400 hover:bg-light-500"
            } transition-all duration-300 flex justify-center items-center w-full py-4 gap-4 rounded-full text-white font-medium select-none`}
          >
            <div>Thanh toán</div>
            <div className="">|</div>
            <div>
              <span>{formatCurrency(cart?.total ?? 0)} VNĐ</span>
            </div>
          </div>
          {/* </Link> */}
        </div>
        <hr />
        <div className="Payments flex flex-col gap-4">
          <p className="text-[#717378] uppercase text-[14px] tracking-[2px] max-sm:tracking-[1px]">
            THANH TOÁN AN TOÀN ĐƯỢC CUNG CẤP BỞI
          </p>
          <div className="flex gap-3">
            <div className="border border-[#e2e2e2] px-3 flex justify-center items-center rounded-[6px]">
              <img className="w-10 h-10" src={vnpay} alt="" />
            </div>
            {/* <div className='border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]'>
                            <img src={visa} alt="" />
                        </div>
                        <div className='border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]'>
                            <img src={bitcoin} alt="" />
                        </div>
                        <div className='border border-[#e2e2e2] py-2 px-3 flex justify-center items-center rounded-[6px]'>
                            <img src={interac} alt="" />
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRight;
