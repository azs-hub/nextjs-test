"use client";

import { useState } from 'react';
import BarChart from "@/app/components/bar-chart";
import LineChart from "@/app/components/line-chart";
import Toggle from '@/app/components/toggle';

export default function Home() {
  const [chartType, setChartType] = useState('Line');

  return (
    <div className="items-center justify-items-center">
      <h1>Welcome to dasboard</h1>
      <div className="dashboard">
      <div class="toggle-container">
        <Toggle
          option1="Line"
          option2="Bar"
          selected={chartType}
          onToggle={setChartType}
        />
      </div>
        {chartType === 'Line' ? <LineChart /> : <BarChart />}
      </div>
    </div>
  );
}
