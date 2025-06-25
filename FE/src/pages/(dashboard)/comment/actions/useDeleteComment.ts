import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/comment/${id}`
        );
        return response.data; // Trả về dữ liệu phản hồi
      } catch (error) {
        console.error("Error updating product:", error);
        throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Comments"],
      });

      toast({
        variant: "success",
        title: "Ẩn đánh giá thành công",
      });
    },

    onError: (error) => {
      console.error("Error updating product:", error);

      let errorMessage = "Đã xảy ra lỗi khi ẩn đánh giá";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        variant: "destructive",
        title: errorMessage,
      });
    },
  });

  return { deleteComment, isDeleting };
};
