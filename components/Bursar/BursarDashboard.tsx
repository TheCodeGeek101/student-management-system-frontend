"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CardDataStats from "@/components/Shared/CardDataStats";
import DataLoader from "../Shared/Loaders/Loader";
import ServerError from "../Shared/Errors/ServerError";
import MonthlyPayments from "../Shared/Charts/monthlyPayments";
import ChartThree from "../Shared/Charts/ChartThree";
import ChartOne from "../Shared/Charts/ChartOne";

// Dynamically import ChartTwo
const ChartTwo = dynamic(() => import("../Shared/Charts/ChartTwo"), {
  ssr: false,
});

interface PaymentData {
  full_payments_count: number;
  pending_payments_count: number;
  refunds_count: number; // Assume you have this data
  total_collected: number; // Assume you have this data
}

interface MonthlyPaymentData {
  month: string;
  total_collected: number;
}

const BursarDashboard: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [monthlyPaymentData, setMonthlyPaymentData] = useState<MonthlyPaymentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        toast.error(error.response?.data || "An error occurred.");
        setError(error.response?.data || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    const getMonthlyPayments = async () => {
      try {
        const response = await axios.post("/api/monthlyPayments", {
          endPoint: "adminstrator",
        });
        
        // Access 'data' array within response
        if (response.status === 200) {
          const formattedData = response.data.data.map((item: { month: string; total_collected: number }) => ({
            month: item.month,
            total_collected: item.total_collected,
          }));
          
          setMonthlyPaymentData(formattedData);
        } else {
          throw new Error("Failed to load monthly payment data.");
        }
      } catch (error: any) {
        toast.error(error.response?.data || "An error occurred.");
        setError(error.response?.data || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    

    getPaymentsCount();
    getMonthlyPayments();
  }, []);

  // Prepare data for pie chart series
  const pieChartData = paymentData
    ? [paymentData.full_payments_count, paymentData.pending_payments_count]
    : [0, 0];

  return (
    <>
      {loading ? (
        <DataLoader />
      )  : paymentData ? (
        <div className="min-h-screen">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {/* Display Payment Stats */}
            <CardDataStats
              title="Full Payments"
              total={paymentData.full_payments_count.toString()}
              rate="0.43%"
              levelUp
            >
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                {/* SVG Content */}
              </svg>
            </CardDataStats>

            <CardDataStats
              title="Pending Payments"
              total={paymentData.pending_payments_count.toString()}
              rate="0.43%"
              levelUp
            >
              <svg className="fill-primary dark:fill-white" width="22" height="16" viewBox="0 0 22 16">
                {/* SVG Content */}
              </svg>
            </CardDataStats>

            {/* <CardDataStats
              title="Refunds"
              total={paymentData.refunds_count.toString()} // Updated with refund count
              rate="0.43%"
              levelUp
            >
              <svg className="fill-primary dark:fill-white" width="10" height="16" viewBox="0 0 22 16">
                {/* SVG Content */}
              {/* </svg> */}
            {/* </CardDataStats> */}
            
          
            <ChartThree series={pieChartData}/>

          </div>


          {/* Render Monthly Payments Chart */}
          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <MonthlyPayments monthlyPayments={monthlyPaymentData} />
      
        <ChartTwo />
        {/* <ChartThree /> */}
        {/* <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
        </div>
      ) : null}
    </>
  );
};

export default BursarDashboard;
