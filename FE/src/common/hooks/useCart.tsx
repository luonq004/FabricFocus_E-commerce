import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";
import { ActionType } from "@/pages/(website)/cart/types";

const CART_QUERY_KEY = "CART";

const getCart = async (userId: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/cart/${userId}`
  );
  return data;
};

const putCart = async (actiton: string, item: ActionType["value"]) => {
  const url = `${import.meta.env.VITE_API_URL}/cart/${actiton}`;
  const { data } = await axios.put(url, item);
  return data;
};

const useCart = (userId: string) => {
  const queryClient = useQueryClient();

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

  const useCartActiton = (action: string) => {
    return useMutation({
      mutationFn: async (item: ActionType["value"]) => {
        const data = await putCart(action, item);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, userId] });
      },
      onError: (error: AxiosError<unknown>) => {
        toast({
          variant: "destructive",
          title: "Lỗi giỏ hàng",
          description: `${
            (error.response?.data as { message?: string })?.message ??
            "Đã xảy ra lỗi"
          }`,
        });
      },
    });
  };

  return {
    cart,
    isLoading,
    isError,
    addItem,
    updateQuantity: useCartActiton("update"),
    removeItem: useCartActiton("remove"),
    increaseItem: useCartActiton("increase"),
    decreaseItem: useCartActiton("decrease"),
    addVoucher: useCartActiton("add-voucher"),
    removeVoucher: useCartActiton("remove-voucher"),
    changeVariant: useCartActiton("change-variant"),
    selectedOneItem: useCartActiton("selected-one"),
    selectedAllItem: useCartActiton("selected-all"),
    removeAllItemSelected: useCartActiton("remove-all-selected"),
  };
};

export default useCart;
