import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import axios from "@/configs/axios";

// Key dùng để invalidate hoặc lấy cache
const VOUCHER_QUERY_KEY = "VOUCHERS";

// Interface chung cho voucher
export interface Ivoucher {
  id?: string;
  code: string;
  category: string;
  discount: number;
  countOnStock: number;
  type: string;
  status?: string;
  startDate: Date;
  endDate: Date;
}

// Hàm fetch voucher theo action (get-all, get-by-id, etc.)
export const useGetVoucher = (action: string, id?: string) => {
  const fetchVoucher = async () => {
    try {
      const { data } = await axios.get(`/voucher/${action}/${id || ""}`);
      return data;
    } catch (error: unknown) {
      let message = "Đã xảy ra lỗi.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      toast({
        variant: "destructive",
        title: "Lỗi voucher",
        description: message,
      });
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [VOUCHER_QUERY_KEY, id || ""],
    queryFn: fetchVoucher,
    enabled: !!action,
  });

  return { data, isLoading, isError };
};

// Tạo voucher
export const useCreateVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Ivoucher) => {
      const { data } = await axios.post("/voucher/create-voucher", item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VOUCHER_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      let message = "Đã xảy ra lỗi.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      toast({
        variant: "destructive",
        title: "Lỗi tạo voucher",
        description: message,
      });
    },
  });
};

// Cập nhật voucher
export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Ivoucher) => {
      const { data } = await axios.put("/voucher/update-voucher", item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VOUCHER_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      let message = "Đã xảy ra lỗi.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      toast({
        variant: "destructive",
        title: "Lỗi cập nhật voucher",
        description: message,
      });
    },
  });
};

// Đổi trạng thái voucher
export const useChangeStatusVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: { status: string; id: string }) => {
      const { data } = await axios.put("/voucher/change-status-voucher", item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VOUCHER_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      let message = "Đã xảy ra lỗi.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      toast({
        variant: "destructive",
        title: "Lỗi đổi trạng thái voucher",
        description: message,
      });
    },
  });
};

// Xóa voucher (soft delete)
export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: { _id: string }) => {
      const { data } = await axios.put("/voucher/delete-vouchesr", item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [VOUCHER_QUERY_KEY] });
    },
    onError: (error: unknown) => {
      let message = "Đã xảy ra lỗi.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      toast({
        variant: "destructive",
        title: "Lỗi xóa voucher",
        description: message,
      });
    },
  });
};
