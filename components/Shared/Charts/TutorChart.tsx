"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import DataLoader from "../Loaders/Loader"; // Ensure you have this loader component

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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
      text: "Students",
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
  teacherId: number;
}

interface TermData {
  id: number;
  name: string;
}

interface Grade {
  student_id: number;
  student_first_name:string;
  student_last_name:string;
  grade_value: number;
}

interface StatisticsData {
  statistics: {
    subject_code: string;
    subject_name: string;
    grades: Grade[];
  }[];
}

const TutorChart: React.FC<ChartOneProps> = ({ teacherId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [terms, setTerms] = useState<TermData[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [academicPerformanceData, setAcademicPerformanceData] = useState<
    StatisticsData["statistics"]
  >([]);

  const endPoint = "teachers";

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.post("/api/GetData", {
          endPoint: "terms",
        });
        if (response.status === 200) {
          setTerms(response.data.terms);
          if (response.data.terms.length > 0) {
            setSelectedTermId(response.data.terms[0].id);
          }
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      }
    };
    fetchTerms();
  }, []);

  useEffect(() => {
    const getPerformanceData = async () => {
      if (selectedTermId === null) return;
      try {
        const response = await axios.post("/api/studentSubjectsApi", {
          endPoint: endPoint,
          termId: selectedTermId,
          teacherId: teacherId,
        });
        if (response.status === 200) {
          setAcademicPerformanceData(response.data.statistics);
        } else {
          throw new Error("Failed to load data.");
        }
      } catch (error: any) {
        toast.error(error.response?.data || "An error occurred.");
        setError(error.response?.data || "An error occurred.");
      }
    };
    getPerformanceData();
  }, [selectedTermId, teacherId]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <p className="font-semibold text-primary">Graphical Analysis of Student Performance in different terms</p>
          </div>
        </div>
        <select
                id="term"
                className="w-full md:w-1/2 lg:w-1/6 mb-5 rounded-md border border-gray-4 bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                value={selectedTermId ?? ''}
                onChange={(e) => setSelectedTermId(Number(e.target.value))}
              >
                {terms.map((term) => (
                  <option key={term.id} value={term.id}>
                    {term.name}
                  </option>
                ))}
              </select>
      </div>

      <div>
        {
          academicPerformanceData.map((stat) => {
            // Prepare data for each subject chart
            const categories = stat.grades.map((grade) => grade.student_first_name); // Extract student IDs
            const series = [
              {
                name: stat.subject_name,
                data: stat.grades.map((grade) => grade.grade_value),
              },
            ];

            return (
              <div key={stat.subject_code} className="-ml-5 mb-5">
                <h3 className="text-lg font-semibold">{stat.subject_name}</h3>
                <ReactApexChart
                  options={{ ...options, xaxis: { ...options.xaxis, categories } }}
                  series={series}
                  type="area"
                  height={350}
                  width={"100%"}
                />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default TutorChart;
