import React from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { ApexOptions } from "apexcharts"; // Import ApexOptions for correct typing

// Dynamically import Chart component, disabling SSR
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartThreeProps {
  series: number[];
}

const ChartThree: React.FC<ChartThreeProps> = ({ series }) => {
  // Define the chart options and make sure the types are correct
  const chartOptions: ApexOptions = {
    chart: {
      type: "pie", // Ensure the type is one of the allowed string literals
    },
    labels: ["Full Payments", "Pending Payments"], // Labels for the pie chart
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart options={chartOptions} series={series} type="pie" width="380" />
    </div>
  );
};

export default ChartThree;
