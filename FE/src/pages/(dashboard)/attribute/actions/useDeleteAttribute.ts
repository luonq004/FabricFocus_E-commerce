import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAttribute, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => axios.delete(`${apiUrl}/attributes/${id}`),

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Ẩn thuộc tính thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["Attributes"],
      });
    },

    onError: (error: unknown) => {
      const err = error as AxiosError<{ message: string }>;
      toast({
        variant: "destructive",
        title: err.response?.data?.message || "Ẩn thuộc tính thất bại",
      });
    },
  });

  return { deleteAttribute, isDeleting };
};
