"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ClassChart: React.FC = () => {
  const endPoint = "adminstrator";
  const [chartData, setChartData] = useState<{ class_name: string; total_students: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTotalNumberOfStudents = async () => {
      try {
        const response = await axios.post("/api/getNumberOfStudents", {
          endPoint: endPoint,
        });
        if (response.status === 200) {
          setChartData(response.data.classes); // Update chartData with the class data
        }
      } catch (error: any) {
        toast.error(error.response?.data || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchTotalNumberOfStudents();
  }, []);

  // Prepare the categories and series data
  const categories = chartData.map((item) => item.class_name); // Array of class names
  const seriesData = chartData.map((item) => item.total_students); // Array of total students

  // Chart options
  const options: ApexOptions = {
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
  
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: true,
    },
  
    xaxis: {
      categories: ["Form 1","Form 2", "Form 3", "Form 4"], // Will update this dynamically with API data
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
  
      markers: {
        strokeColor: "#000", // Valid property
        strokeWidth: 2,      // Valid property
        fillColors: ["#3C50E0", "#80CAEE"], // Valid property
      },
    },
    fill: {
      opacity: 1,
    },
  };
  

  // Chart series
  const series = [
    {
      name: "Total Students",
      data: seriesData, // Dynamic series data from API
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black ">
            Students By Classes
          </h4>
        </div>
        <div>
          
        </div>
      </div>

      <div>
        <div id="ClassChart" className="-mb-9 -ml-5">
          {loading ? (
            <Loader/>
          ) : (
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={350}
              width={"100%"}
            />
          )}
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default ClassChart;
