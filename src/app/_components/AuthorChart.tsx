"use client";
import React from "react";
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
  data: { author: string; count: number }[];
}

export default function AuthorChart({ data }: Props) {
  data.sort((a, b) => b.count - a.count);
  const labels = data.map((d) => d.author);
  const values = data.map((d) => d.count);
  options.scales!.x!.suggestedMax = Math.max(...values) * 1.1;

  const categoryPercentage = data.length > 3 ? 0.6 : 0.2;

  const dataset: ChartDataset<"bar"> = {
    data: values,
    categoryPercentage: categoryPercentage,
    borderWidth: 1,
    borderColor: "#7FC4F2",
    backgroundColor: "#D7ECFB",
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
