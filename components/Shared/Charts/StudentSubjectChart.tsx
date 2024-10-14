"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const StudentSubjectChart: React.FC<{ tutorId: number }> = ({ tutorId }) => {
  const endPoint = "teachers";
  const [chartData, setChartData] = useState<{ subject_name: string; student_count: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNumberOfStudentSubjects = async () => {
      try {
        const response = await axios.post("/api/TotalStudentsSubject", {
          endPoint: endPoint,
          tutorId: tutorId
        });
        if (response.status === 200) {
          setChartData(response.data.students);
        }
      } catch (error: any) {
        toast.error(error.response?.data || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchNumberOfStudentSubjects();
  }, [tutorId]);

  // Extracting subject names and student counts from the fetched data
  const subjectNames = chartData.map(item => item.subject_name);
  const studentCounts = chartData.map(item => item.student_count);

  const options: ApexOptions = {
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
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
      enabled: false,
    },
    xaxis: {
      categories: subjectNames, // Corrected: use subjectNames directly, not wrapped in an array
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.floor(value).toString(),
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
    },
    fill: {
      opacity: 1,
    },
  };
   

  const series = [
    {
      name: "Number of Students",
      data: studentCounts,  // Updated with student counts
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <h4 className="text-xl font-semibold text-black">
        Number of Students Enrolled by Subject
        </h4>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          {!loading && (
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
    </div>
  );
};

export default StudentSubjectChart;
