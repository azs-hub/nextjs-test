"use client";

import { useState } from 'react';
import ChartComponent from "@/app/components/chart";
import Toggle from '@/app/components/toggle';
import { ChartType, DataType } from "@/app/types";

export default function Home() {
  const [chartType, setChartType] = useState<ChartType>(ChartType.Bar);
  const [dataType, setDataType] = useState<DataType>(DataType.Raw);

  return (
    <div className="container justify-center items-center">
      <div className="dashboard">
        <div className="toggle-container">
          <Toggle
            option1={ChartType.Bar}
            option2={ChartType.Line}
            selected={chartType}
            onToggle={setChartType}
          />
          <Toggle
            option1={DataType.Raw}
            option2={DataType.Normalized}
            selected={dataType}
            onToggle={setDataType}
          />
        </div>
        <ChartComponent chartType={chartType} dataType={dataType} />
      </div>
    </div>
  );
}
