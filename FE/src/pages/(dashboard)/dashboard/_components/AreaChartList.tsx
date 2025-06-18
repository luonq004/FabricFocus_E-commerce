import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "@/configs/axios";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Doanh thu",
    color: "#2a9d90",
  },
  mobile: {
    label: "Lợi nhuận",
    color: "#e76e50",
  },
} satisfies ChartConfig;

export function AreaChartList() {
  const {
    data: chartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const { data } = await axios.get("/dashboard/get-data-area-chart");
      setFilteredData(data);
      return data;
    },
  });
  const [filterType, setFilterType] = React.useState("day"); // Mặc định lọc theo ngày
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [filteredData, setFilteredData] = React.useState(chartData);

  const filterData = () => {
    const start = new Date(startDate || chartData[0].date);
    const end = new Date(endDate || chartData[chartData.length - 1].date);

    let newData = chartData?.filter((item: any) => {
      const date = new Date(item.date);

      // Lọc theo ngày
      if (filterType === "day") {
        return date >= start && date <= end;
      }

      // Lọc theo tháng
      if (filterType === "month") {
        return (
          (date.getFullYear() > start.getFullYear() ||
            (date.getFullYear() === start.getFullYear() &&
              date.getMonth() >= start.getMonth())) &&
          (date.getFullYear() < end.getFullYear() ||
            (date.getFullYear() === end.getFullYear() &&
              date.getMonth() <= end.getMonth()))
        );
      }

      // Lọc theo năm
      if (filterType === "year") {
        return (
          date.getFullYear() >= start.getFullYear() &&
          date.getFullYear() <= end.getFullYear()
        );
      }

      return false;
    });

    // Nếu lọc theo tháng, tổng hợp dữ liệu theo tháng
    if (filterType === "month") {
      const groupedByMonth = {};

      newData.forEach((item: any) => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!groupedByMonth[monthKey]) {
          groupedByMonth[monthKey] = { date: monthKey, desktop: 0, mobile: 0 };
        }

        groupedByMonth[monthKey].desktop += item.desktop;
        groupedByMonth[monthKey].mobile += item.mobile;
      });

      newData = Object.values(groupedByMonth);
    }

    // Nếu lọc theo năm, tổng hợp dữ liệu theo năm
    if (filterType === "year") {
      const groupedByYear = {};

      newData.forEach((item: any) => {
        const date = new Date(item.date);
        const yearKey = `${date.getFullYear()}`;

        if (!groupedByYear[yearKey]) {
          groupedByYear[yearKey] = { date: yearKey, desktop: 0, mobile: 0 };
        }

        groupedByYear[yearKey].desktop += item.desktop;
        groupedByYear[yearKey].mobile += item.mobile;
      });

      newData = Object.values(groupedByYear);
    }

    // console.log('newData', newData);
    setFilteredData(newData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader className="flex items-center sm:items-start gap-2 space-y-0 border-b py-5 2xl:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Biểu đồ doanh thu và lợi nhuận</CardTitle>
          <CardDescription>
            Biểu đồ so sánh doanh thu và lợi nhuận
          </CardDescription>
        </div>

        {/* Chọn kiểu lọc */}
        <div className="flex flex-col xl:flex-row items-start gap-2">
          <div className="flex flex-col lg:flex-row items-center gap-2">
            {/* Chọn ngày bắt đầu và ngày kết thúc */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <label htmlFor="start">Ngày bắt đầu:</label>
              <input
                type="date"
                id="start"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={chartData[0].date}
                max={chartData[chartData.length - 1].date}
                className="border rounded-lg px-2 py-1"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <label htmlFor="end">Ngày kết thúc:</label>
              <input
                type="date"
                id="end"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={chartData[0].date}
                max={chartData[chartData.length - 1].date}
                className="border rounded-lg px-2 py-1"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <label htmlFor="start">Biểu đồ theo</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px] rounded-lg mt-0">
                <SelectValue placeholder="Chọn kiểu lọc" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="day">Ngày</SelectItem>
                <SelectItem value="month">Tháng</SelectItem>
                <SelectItem value="year">Năm</SelectItem>
              </SelectContent>
            </Select>

            {/* Nút lọc */}
            <Button onClick={filterData} className="1408px:ml-4">
              Lọc dữ liệu
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Hiển thị biểu đồ */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={filteredData}
            className="aspect-auto h-[300px] w-full"
          >
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2a9d90" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2a9d90" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e76e50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e76e50" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={24}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (filterType === "day") {
                  return date.toLocaleDateString("vi-VN", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  });
                }
                if (filterType === "month") {
                  return value; // Dữ liệu theo tháng đã ở dạng "YYYY-MM"
                }
                if (filterType === "year") {
                  return date.getFullYear();
                }
                return value;
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    if (filterType === "day") {
                      const date = new Date(value);
                      return date.toLocaleDateString("vi-VN", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      });
                    }
                    if (filterType === "month") {
                      return value; // Hiển thị "YYYY-MM"
                    }
                    if (filterType === "year") {
                      return value; // Hiển thị năm
                    }
                    return value;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="#e76e50"
              stackId="a"
              fillOpacity={0.4}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="#2a9d90"
              stackId="a"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
