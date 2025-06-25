import Icart from "@/common/types/cart";
import { formatCurrency } from "@/lib/utils";

const CheckSubmitOrder = ({ cart }: { cart: Icart }) => {
  return (
    <div>
      <div className="flex flex-col gap-6  border-[#F4F4F4] ">
        <div className="Subtotal flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
              Tổng tiền hàng
            </p>
            <div>
              <span>{formatCurrency(cart?.subTotal ?? 0)} VNĐ</span>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-[#9D9EA2] transition-all duration-500 max-sm:text-[14px]">
              Giảm giá sản phẩm
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
      </div>
    </div>
  );
};

export default CheckSubmitOrder;
