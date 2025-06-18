import { toast } from "@/components/ui/use-toast";
import SkeletonCart from "./SkeletonCart";
import useCart from "@/common/hooks/useCart";
import { useState } from "react";
import CheckOutSubmitVoucher from "./CheckOutSubmitVoucher";
import { useUserContext } from "@/common/context/UserProvider";

const CheckOutVoucher = () => {
  const [, setAttribute] = useState<string | 1>("1");

  const { _id } = useUserContext();

  // const userId = "67370b2bba67ac60aea58be8"; // USER ID
  const { cart, isLoading, isError, addVoucher, removeVoucher, changeVariant } =
    useCart(_id);
  // console.log(cart)

  function userAction(action: any, value: any) {
    const item = {
      userId: _id,
      ...value,
    };
    // console.log(item)
    switch (action.type) {
      case "applyVoucher":
        addVoucher.mutate(item, {
          onSuccess: () => {
            // console.log(`Thêm mã giảm giá ${value.voucherCode} thành công`)
            toast({
              title: "Sucsess",
              description: `Thêm mã giảm giá ${value.voucherCode} thành công`,
            });
          },
        });
        break;

      case "removeVoucher":
        removeVoucher.mutate(item);
        break;

      case "changeVariant":
        changeVariant.mutate(item, {
          onSuccess: () => {
            toast({
              title: "Sucsess",
              description: "Đổi thành công!",
            });
            setAttribute("1");
          },
        });
        break;
    }
  }

  if (isLoading) return <SkeletonCart />;
  if (isError) return <div>Is Error</div>;

  return (
    <div>
      <CheckOutSubmitVoucher cart={cart} userAction={userAction} />
    </div>
  );
};

export default CheckOutVoucher;
