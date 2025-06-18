import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/configs/axios";

export const useDeleteProduct = (idP: string) => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.post(`/products/${id}`);
        return response.data; // Trả về dữ liệu phản hồi
      } catch (error) {
        console.error("Error updating product:", error);
        throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });

      toast({
        variant: "success",
        title: "Cập nhật sản phẩm thành công",
      });
    },
  });

  return { deleteProduct, isDeleting };
};
