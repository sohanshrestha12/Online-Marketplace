import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { CombinedData } from "@/Types/Product";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface DashboardChartProps {
  combinedData: CombinedData[] | undefined;
}

const DashboardChart = ({combinedData}:DashboardChartProps) => {
  useEffect(()=>{
    console.log('this is form combined usedeffect state value',combinedData);
  },[combinedData])
    const chartConfig = {
      desktop: {
        label: "Products Created",
        color: "#2563eb",
      },
      mobile: {
        label: "Products Sold",
        color: "#60a5fa",
      },
    } satisfies ChartConfig;
  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ];
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={combinedData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="totalCreated" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="totalSold" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default DashboardChart;
