import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const CART_QUERY_KEY = "WishList";

const putWishList = async (
  action: string,
  item: {
    productId: string;
    userId: string;
  }
) => {
  const url = `${apiUrl}/wishlist/${action}`;
  const { data } = await axios.put(url, item);
  return data;
};

const useWishList = (userId: string) => {
  const queryClient = useQueryClient();

  const handleError = (error: unknown) => {
    const err = error as { response?: { data?: { message?: string } } };

    toast({
      variant: "destructive",
      title: "Error",
      description: `${err.response?.data?.message || "Something went wrong"}`,
    });
  };

  const removeItem = useMutation({
    mutationFn: (item: { productId: string; userId: string }) =>
      putWishList("remove", item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CART_QUERY_KEY, userId] });
    },
    onError: handleError,
  });

  return {
    removeItem,
  };
};

export default useWishList;
