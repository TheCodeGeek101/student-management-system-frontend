import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";

// Dynamic import for the ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Initial chart options
const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "bar",
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
    width: [2],
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
  xaxis: {
    type: "category",
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

interface TermData {
  id: number;
  name: string;
}

interface GradeData {
  subject_code:string;
  subject_name: string;
  grade_value: number;
}

interface StudentData {
  average_grade_value: number;
  total_subjects: number;
  grades: GradeData[];
}

interface StudentProps {
  studentId: number;
}

const StudentChart: React.FC<StudentProps> = ({ studentId }) => {
  const [terms, setTerms] = useState<TermData[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const endPoint = "students";

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
        toast.error(error.response?.data || "An error occurred.");
      }
    };
    fetchTerms();
  }, []);

  useEffect(() => {
    const getPerformanceData = async () => {
      if (selectedTermId === null) return;
      try {
        const response = await axios.post("/api/StudentDashApi", {
          endPoint: endPoint,
          termId: selectedTermId,
          studentId: studentId,
        });
        if (response.status === 200) {
          setStudentData(response.data.statistics);
        } else {
          throw new Error("Failed to load data.");
        }
      } catch (error: any) {
        toast.error(error.response?.data || "An error occurred.");
      }
    };
    getPerformanceData();
  }, [selectedTermId, studentId]);

  // Prepare series data for the chart
  const series = studentData
    ? [
        {
          name: "Grades",
          data: studentData.grades.map((grade) => grade.grade_value),
        },
      ]
    : [];

  // Create a copy of options and update xaxis categories
  const updatedOptions = {
    ...options,
    xaxis: {
      ...options.xaxis,
      categories: studentData ? studentData.grades.map((grade) => grade.subject_code) : [],
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Average Grade</p>
              <p className="text-sm font-medium">
                {studentData ? studentData.average_grade_value.toFixed(2) : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Subjects</p>
              <p className="text-sm font-medium">
                {studentData ? studentData.total_subjects : "N/A"}
              </p>
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
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={updatedOptions} // Use the updated options here
            series={series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentChart;
