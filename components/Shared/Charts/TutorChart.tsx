"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Chart options configuration
const options: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "smooth",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    fillOpacity: 1,
  },
  xaxis: {
    type: "category",
    title: {
      text: "Subject Code",
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: "Grades",
    },
    min: 0,
    max: 100,
  },
};

interface ChartOneProps {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const ChartOne: React.FC<ChartOneProps> = ({ series, categories }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        {/* Legend and Filter Buttons */}
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          {/* Add legend items here based on the series names */}
          { series.map((s, index) => (
            <div key={index} className="flex min-w-47.5">
              <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full" style={{ backgroundColor: options.colors[index % options.colors.length] }}></span>
              </span>
              <div className="w-full">
                <p className="font-semibold text-primary">{s.name}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Optional Filter Buttons */}
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card">Day</button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card">Week</button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card">Month</button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{ ...options, xaxis: { ...options.xaxis, categories } }}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
