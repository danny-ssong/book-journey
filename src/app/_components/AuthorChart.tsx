"use client";
import React, { useEffect, useState } from "react";
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
import { PostWithBook } from "../../types/supabaseTypes";
import { usePrimaryColorHsl } from "../_hooks/usePrimaryColorHsl";

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
  indexAxis: "y" as const,
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
            (context.dataset as CustomBarChartDataset).customData?.[
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
      ticks: {
        autoSkip: true,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
          weight: "bold",
        },
      },
    },
  },
};

interface Props {
  data: { author: string; posts: PostWithBook[] }[];
}

type CustomBarChartDataset = ChartDataset<"bar"> & {
  customData: PostWithBook[][];
};

export default function AuthorChart({ data }: Props) {
  const { primaryColor, darkerPrimaryColor } = usePrimaryColorHsl();

  data.sort((a, b) => b.posts.length - a.posts.length);
  const labels = data.map((d) => d.author);
  const postCount = data.map((d) => d.posts.length);
  options.scales!.x!.suggestedMax = Math.max(...postCount) * 1.1;

  const categoryPercentage = data.length > 3 ? 0.6 : 0.2;

  const dataset: CustomBarChartDataset = {
    data: postCount,
    categoryPercentage: categoryPercentage,
    borderWidth: 1,
    borderColor: darkerPrimaryColor,
    backgroundColor: primaryColor,
    customData: data.map((d) => d.posts),
  };

  const barData = {
    labels,
    datasets: [dataset],
  };

  return (
    <div className="rounded-lg px-5 py-4 shadow">
      <div className="max-h-[300px] overflow-y-auto">
        <div style={{ height: `${data.length * 45}px` }}>
          <Bar options={options} data={barData} />
        </div>
      </div>
    </div>
  );
}
