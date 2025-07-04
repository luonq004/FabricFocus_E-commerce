import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCategory } from "./api";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategories, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => deleteCategory(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["Categories"],
      });

      toast({
        variant: "success",
        title: data.message,
      });
    },
  });

  return { deleteCategories, isDeleting };
};
