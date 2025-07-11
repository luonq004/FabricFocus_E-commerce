import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createCategory, isPending: isCreatting } = useMutation({
    mutationFn: (data: unknown) => axios.post(`${apiUrl}/category`, data),

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Tạo danh mục thành công",
      });
      navigate("/admin/categories");
      queryClient.invalidateQueries({
        queryKey: ["Categories"],
      });
    },

    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      toast({
        variant: "destructive",
        title: err.response?.data?.message || "Đã xảy ra lỗi",
      });
    },
  });

  return { createCategory, isCreatting };
};
