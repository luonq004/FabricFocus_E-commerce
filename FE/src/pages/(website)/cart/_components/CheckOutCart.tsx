import { useUserContext } from "@/common/context/UserProvider";
import useCart from "@/common/hooks/useCart";
import CheckSubmitOrder from "./CheckSubmitOrder";
import SkeletonCart from "./SkeletonCart";

const CheckOutCart = () => {
  const { _id } = useUserContext();

  const { cart, isLoading, isError } = useCart(_id!);

  if (isLoading) return <SkeletonCart />;
  if (isError) return <div>Is Error</div>;

  return (
    <div>
      <CheckSubmitOrder cart={cart} />
    </div>
  );
};

export default CheckOutCart;
