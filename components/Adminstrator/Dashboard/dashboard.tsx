"use client"; 
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CardDataStats from "@/components/Shared/CardDataStats";
import axios from "axios";
import toast from "react-hot-toast";
import DataLoader from "@/components/Shared/Loaders/Loader";
import PerformanceChart from "@/components/Shared/Charts/performanceChart";
import TeacherPerformanceChart from "@/components/Shared/Charts/TeacherPerformanceChart";
import ChartTwo from "@/components/Shared/Charts/ChartTwo";
// import AdminEvents from "./eventsim/ADminEvents";
import ClassChart from "@/components/Shared/Charts/ClassChart";
const MapOne = dynamic(() => import("@/components/Shared/Maps/MapOne"), {
  ssr: false,
});

interface StudentStats {
  students: number;
}

interface TeacherStats {
  totalTeachers: number;
}

interface PerformanceData {
  performance: {
    status: string;
    performance_graph: GraphData;
    top_performing_graph: GraphData;
    struggling_students_graph: GraphData;
    teacher_performance_graph: TeacherPerformanceGraphData;
  };
}

interface GraphData {
  labels: { [key: string]: string }; // Object with dynamic keys for labels
  dataPoints: number[];              // Array of numbers for data points
}

interface TeacherPerformanceGraphData {
  labels: string[];  // Array of strings for teacher names
  dataPoints: number[]; // Array of numbers for teacher performance
}

interface PaymentData {
  full_payments_count: number;
  pending_payments_count: number;
  refunds_count: number; // Assume you have this data
  total_collected: number; // Assume you have this data
}

const AdminDashboard: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [totalStudents, setTotalStudents] = useState<StudentStats | null>(null);
  const [withdrawnStudents, setWithdrawnStudents] = useState<StudentStats | null>(null);
  const [totalActiveTeachers, setTotalTeachers] = useState<TeacherStats | null>(null);
  const [academicPerformanceData, setAcademicPerformanceData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTotalStudents = async () => {
      try {
        const response = await axios.post("/api/GetData", {
          endPoint: "adminstrator/students/active",
        });
        if (response.status === 200) {
          setTotalStudents(response.data); 
        } else {
          throw new Error("Failed to load data.");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setError(errorMessage); // Ensure this is a string
      }
    };

    const getWithdrawnStudents = async () => {
      try {
        const response = await axios.post("/api/GetData", {
          endPoint: "adminstrator/students/withdrawn",
        });
        if (response.status === 200) {
          setWithdrawnStudents(response.data);
        } else {
          throw new Error("Failed to load data.");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setError(errorMessage); // Ensure this is a string
      }
    };

    const getTotalNumberOfTeachers = async () => {
      try {
        const response = await axios.post("/api/GetData", {
          endPoint: "adminstrator/tutors/active",
        });
        if (response.status === 200) {
          setTotalTeachers(response.data);
        } else {
          throw new Error("Failed to load data.");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setError(errorMessage); // Ensure this is a string
      }
    };

    const getPerformanceData = async () => {
      try {
        const response = await axios.post("/api/GetData", {
          endPoint: "adminstrator/students/academic/performance",
        });
        if (response.status === 200) {
          setAcademicPerformanceData(response.data);
        } else {
          throw new Error("Failed to load data.");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setError(errorMessage); // Ensure this is a string
      }
    };

    const getPaymentsCount = async () => {
      try {
        const response = await axios.post("/api/paymentsCount", {
          endPoint: "adminstrator",
        });
        if (response.status === 200) {
          setPaymentData(response.data); 
        } else {
          throw new Error("Failed to load data.");
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setError(errorMessage); // Ensure this is a string
      } finally {
        setLoading(false);
      }
    };

    getPaymentsCount();
    getTotalStudents();
    getWithdrawnStudents();
    getTotalNumberOfTeachers();
    getPerformanceData();
  }, []);

  // if (loading) return <DataLoader />;
//   if (error) return <div>Error loading data: {error}</div>;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {totalStudents && totalActiveTeachers && withdrawnStudents && paymentData ? (
          <>
            <CardDataStats title="Total Active Students" total={totalStudents.students.toString()} rate="" levelUp>
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                {/* SVG Content */}
              </svg>
            </CardDataStats>
            <CardDataStats title="Total Withdrawn Students" total={withdrawnStudents.students.toString()} rate="" levelUp>
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                {/* SVG Content */}
              </svg>
            </CardDataStats>
            <CardDataStats title="Total Active Teachers" total={totalActiveTeachers.totalTeachers.toString()} rate="" levelUp>
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                {/* SVG Content */}
              </svg>
            </CardDataStats>
            <CardDataStats
              title="Full Fees Payments"
              total={paymentData.full_payments_count.toString()}
              rate=""
              levelUp
            >
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                {/* SVG Content */}
              </svg>
            </CardDataStats>
          </>
        ) : null}
      </div>
      {/* Performance Chart - Pass the relevant performance data as props */}
      {academicPerformanceData ? (
        <>
          <div className="mt-5 ">
            <TeacherPerformanceChart 
              teacherPerformanceData={{
                labels: academicPerformanceData.performance.teacher_performance_graph.labels,
                dataPoints: academicPerformanceData.performance.teacher_performance_graph.dataPoints,
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <PerformanceChart 
              performanceData={{
                name: "Students",
                data: academicPerformanceData.performance.performance_graph.dataPoints,
              }}
              topPerformingData={{
                name: "Top Performing Students",
                data: academicPerformanceData.performance.top_performing_graph.dataPoints,
              }}
              strugglingData={{
                name: "Struggling Students",
                data: academicPerformanceData.performance.struggling_students_graph.dataPoints,
              }}
            />
            <ClassChart/>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AdminDashboard;
