import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/configs/axios";
import Icart from "../types/cart";

const CART_QUERY_KEY = "CART";

const getCart = async (userId: string) => {
  const { data } = await axios.get(`/cart/${userId}`);
  return data;
};

const putCart = async (actiton: string, item: Icart) => {
  const url = `/cart/${actiton}`;
  const { data } = await axios.put(url, item);
  // console.log(data)
  return data;
};

const useCart = (userId: string) => {
  const queryClient = useQueryClient();

  console.log("userIdCC: ", userId);

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [CART_QUERY_KEY, userId],
    queryFn: async () => await getCart(userId),
    enabled: !!userId,
    // staleTime: 1000,

    // !!userId => chuyển đổi sang dạng boolean. Nếu userId ko rỗng -> trả về true, kích hoạt truy vấn. Nếu userId rỗng thì ngược lại
  });

  const addItem = () => {};

  const cartActiton = (action: string) => {
    return useMutation({
      mutationFn: async (item: Icart) => {
        const data = await putCart(action, item);
        // console.log(data)
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, userId] });
      },
      onError: (error: any) => {
        // console.log(error.response.data.message)
        toast({
          variant: "destructive",
          title: "Lỗi giỏ hàng",
          description: `${error.response.data.message}`,
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      },
    });
  };

  return {
    cart,
    isLoading,
    isError,
    addItem,
    updateQuantity: cartActiton("update"),
    removeItem: cartActiton("remove"),
    increaseItem: cartActiton("increase"),
    decreaseItem: cartActiton("decrease"),
    addVoucher: cartActiton("add-voucher"),
    removeVoucher: cartActiton("remove-voucher"),
    changeVariant: cartActiton("change-variant"),
    selectedOneItem: cartActiton("selected-one"),
    selectedAllItem: cartActiton("selected-all"),
    removeAllItemSelected: cartActiton("remove-all-selected"),
  };
};

export default useCart;
