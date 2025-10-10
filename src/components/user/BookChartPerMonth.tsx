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
import { usePrimaryColorHsl } from "@/hooks/usePrimaryColorHsl";
import { PostWithBook } from "@/types/post";
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
      enabled: true,
      callbacks: {
        title: function () {
          return "";
        },
        label: function (context) {
          const dataIndex = context.dataIndex;
          const posts =
            (context.dataset as CustomBarChartDataset).postsPerMonth?.[
              dataIndex
            ] || [];
          if (posts.length > 1) {
            const bookTitles = posts.map(
              (post: PostWithBook) => `- ${post.book.title}`,
            );
            return bookTitles;
          } else if (posts.length === 1) {
            return posts[0].book.title;
          } else {
            return "No posts";
          }
        },
      },
      displayColors: false,
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

const generateMonthRange = (startDate: string, endDate: string) => {
  //시작날과 1년전을 비교해서 작은 날짜로 시작
  //최소 1년은 보여주기 위해서
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  oneYearAgo.setMonth(oneYearAgo.getMonth() + 1);
  const start = new Date(startDate);
  const minDate = Math.min(start.getTime(), oneYearAgo.getTime());

  let current = dayjs(minDate).startOf("month");
  const end = dayjs(endDate).startOf("month");

  const result = [];
  while (current.isBefore(end) || current.isSame(end)) {
    result.push(current.format("YYYY-MM"));
    current = current.add(1, "month");
  }

  return result;
};

interface Props {
  data: { month: string; posts: PostWithBook[] }[];
}

type CustomBarChartDataset = ChartDataset<"bar"> & {
  postsPerMonth: PostWithBook[][];
};

export default function BookChartPerMonth({ data }: Props) {
  const { primaryColor, darkerPrimaryColor } = usePrimaryColorHsl();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, []);

  const sortedDates = data.sort((a, b) => {
    const dateA = dayjs(a.month);
    const dateB = dayjs(b.month);
    return dateA.isAfter(dateB) ? 1 : -1;
  });

  const startDate = sortedDates[0].month;
  const endDate = sortedDates[sortedDates.length - 1].month;
  const months = generateMonthRange(startDate, endDate);
  const monthFromDates = data.map((d) => dayjs(d.month).format("YYYY-MM"));
  const postCountPerMonth = [];
  const postsPerMonth = [];
  for (let i = 0; i < months.length; i++) {
    if (monthFromDates.includes(months[i])) {
      const index = monthFromDates.indexOf(months[i]);
      postsPerMonth.push(data[index].posts);
      postCountPerMonth.push(data[index].posts.length);
    } else {
      postsPerMonth.push([]);
      postCountPerMonth.push(0);
    }
  }

  options.scales!.y!.suggestedMax = Math.max(...postCountPerMonth) * 1.1;

  const categoryPercentage = data.length > 5 ? 0.3 : 0.2;

  const dataset: CustomBarChartDataset = {
    data: postCountPerMonth,
    categoryPercentage: categoryPercentage,
    borderWidth: 1,
    borderColor: darkerPrimaryColor,
    backgroundColor: primaryColor,
    postsPerMonth: postsPerMonth,
  };

  const barData = {
    labels: months,
    datasets: [dataset],
  };

  return (
    <div className="rounded-lg shadow">
      <div ref={scrollContainerRef} className="overflow-x-auto">
        <div
          style={{
            width: `${months.length > 5 ? months.length * 60 : 300}px`,
            height: "300px",
          }}
        >
          <Bar options={options} data={barData} />
        </div>
      </div>
    </div>
  );
}
