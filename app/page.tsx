"use client";

import { useState } from 'react';
// import BarChart from "@/app/components/bar-chart";
// import LineChart from "@/app/components/line-chart";
import ChartComponent from "@/app/components/chart";
import Toggle from '@/app/components/toggle';

export default function Home() {
  const [chartType, setChartType] = useState('Bar');
  const [dataType, setDataType] = useState('Raw');

  return (
    <div className="container justify-center items-center">
      <div className="dashboard">
        <div className="toggle-container">
          <Toggle
            option1="Bar"
            option2="Line"
            selected={chartType}
            onToggle={setChartType}
          />
          <Toggle
            option1="Raw"
            option2="Normalized"
            selected={dataType}
            onToggle={setDataType}
          />
        </div>
        <ChartComponent chartType={chartType} dataType={dataType} />
      </div>
    </div>
  );
}
