"use client";
import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartDataset,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

const options: ChartOptions<"bar"> = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      anchor: "end",
      align: "end",
      color: "black",
      font: {
        size: 10,
        weight: "bold",
      },
      formatter: (value) => value,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      offset: true,
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: true,
        stepSize: 1,
      },
    },
  },
};

interface Props {
  data: { month: string; count: number }[];
}

const generateMonthRange = (startDate: string, endDate: string) => {
  const result = [];
  let current = dayjs(startDate).startOf("month");
  const end = dayjs(endDate).startOf("month");

  while (current.isBefore(end) || current.isSame(end)) {
    result.push(current.format("YYYY-MM"));
    current = current.add(1, "month");
  }

  return result;
};

export default function BookChartPerMonth({ data }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sortedDates = data.sort((a, b) => {
    const dateA = dayjs(a.month);
    const dateB = dayjs(b.month);
    return dateA.isAfter(dateB) ? 1 : -1;
  });

  const startDate = sortedDates[0].month;
  const endDate = sortedDates[sortedDates.length - 1].month;
  const months = generateMonthRange(startDate, endDate);
  const monthFromDates = data.map((d) => dayjs(d.month).format("YYYY-MM"));
  const postCountsPerMonth = [];
  for (let i = 0; i < months.length; i++) {
    if (monthFromDates.includes(months[i])) {
      const index = monthFromDates.indexOf(months[i]);
      postCountsPerMonth.push(data[index].count);
    } else {
      postCountsPerMonth.push(0);
    }
  }
  options.scales!.y!.suggestedMax = Math.max(...postCountsPerMonth) * 1.1;

  const categoryPercentage = data.length > 5 ? 0.3 : 0.1;

  const dataset: ChartDataset<"bar"> = {
    data: postCountsPerMonth,
    categoryPercentage: categoryPercentage,
    borderWidth: 1,
    borderColor: "#7FC4F2",
    backgroundColor: "#D7ECFB",
  };

  const barData = {
    labels: months,
    datasets: [dataset],
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="rounded-lg shadow">
      <div ref={scrollContainerRef} className="overflow-x-auto">
        <div style={{ width: `${months.length * 60}px`, height: "300px" }}>
          <Bar options={options} data={barData} />
        </div>
      </div>
    </div>
  );
}
