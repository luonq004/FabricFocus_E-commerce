import { columnsOrder } from "./columnsOrder";
import { DataTableOrder } from "./dataTableOrder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

import axios from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["OrderList"],
    queryFn: async () => {
      const { data } = await axios.get("/dashboard/get-data-order-list");
      return data;
    },
  });

  const newData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map((order: any) => ({
      id: order._id,
      orderCode: order.orderCode || "N/A",
      customer: order.addressId.name || "N/A",
      phone: order.addressId.phone || "N/A",
      email: order.userId.email || "N/A",
      imageUrl: order.userId.imageUrl || undefined,
      amount: order.totalPrice || 0,
      payment: order.payment || "N/A",
      status: order.status || "unknown",
      // createdAt: order.createdAt || "",
    }));
  }, [data]);

  // console.log(newData);
  if (isLoading)
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[325px] w-full rounded-xl bg-white" />
      </div>
    );
  if (isError) return <div>Error</div>;
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Đơn đặt hàng gần đây</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 px-6">
        <div className="w-full flex flex-col justify-between rounded-lg">
          <DataTableOrder columns={columnsOrder} data={newData} />
        </div>
      </CardContent>
    </Card>
  );
}
