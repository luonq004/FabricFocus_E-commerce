import { useEffect } from "react";
//other
import { useUserContext } from "@/common/context/UserProvider";
import useCart from "@/common/hooks/useCart";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";
import SkeletonCart from "./SkeletonCart";

const ShopCart = () => {
  const { _id }: { _id: string } = useUserContext();

  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  const {
    cart,
    isLoading,
    isError,
    updateQuantity,
    increaseItem,
    decreaseItem,
    removeItem,
    addVoucher,
    removeVoucher,
    selectedOneItem,
    selectedAllItem,
    removeAllItemSelected,
  } = useCart(_id);

  function userAction(action: any, value: any) {
    console.log("userAction", action, value);
    const item = {
      userId: _id,
      ...value,
    };
    // console.log(item)
    switch (action.type) {
      case "changeQuantity":
        if (!value.quantity || value.quantity < 0) {
          return;
        }
        if (isNaN(value.quantity)) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Vui lòng nhập số!`,
          });
          return;
        }

        updateQuantity.mutate(item);
        break;

      case "decreaseItem":
        if (value.quantity === 1) {
          const confirm = window.confirm("Sản phẩm sẽ bị xóa, bạn chắc chứ?");
          if (!confirm) return;
          decreaseItem.mutate(item);
        }
        decreaseItem.mutate(item);
        break;

      case "increaseItem":
        increaseItem.mutate(item);
        break;

      case "removeItem":
        if (!window.confirm("Bạn chắc muốn xóa sản phẩm không?")) return;
        removeItem.mutate(item);
        break;

      case "applyVoucher":
        addVoucher.mutate(item, {
          onSuccess: () => {
            toast({
              title: "Thành công",
              description: `Thêm mã giảm giá ${value.voucherCode} thành công`,
            });
          },
        });
        break;

      case "removeVoucher":
        removeVoucher.mutate(item, {
          onSuccess: () => {
            toast({
              title: "Thành công",
              description: `Gỡ mã giảm giá thành công`,
            });
          },
        });
        break;

      case "selectedOne":
        selectedOneItem.mutate(item);
        break;

      case "selectedAll":
        selectedAllItem.mutate(item);
        break;

      case "removeAllSelected":
        removeAllItemSelected.mutate(item);
        break;
    }
  }

  if (isLoading) return <SkeletonCart />;
  if (isError)
    return (
      <div className="flex items-center justify-center p-[10rem] my-10   ">
        <AiOutlineExclamationCircle className="text-red-500 text-xl mr-2" />
        <span className="text-red-600 font-semibold">
          Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
        </span>
      </div>
    );

  return (
    <>
      {/* Cart  */}
      {/* <ModeToggle /> */}
      <section className="Status_Cart transition-all duration-500 space-y-8 px-4 py-8 max-w-[1408px] w-full max-[1408px]:w-[88%] mx-auto grid grid-cols-[57%_auto] max-lg:grid-cols-1 gap-x-16">
        {/* Cart__Left */}
        <CartLeft
          cart={cart}
          userAction={userAction}
          isLoading={isLoading}
          isError={isError}
        />
        {/* End Cart__Left  */}

        {/* Cart__Right */}
        <CartRight cart={cart} userAction={userAction} />
        {/* End Cart__Right  */}
      </section>
      {/* End Cart  */}
    </>
  );
};

export default ShopCart;
