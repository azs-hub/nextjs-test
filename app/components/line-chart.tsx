"use client";

import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  chartData: ChartData<'line'>; // Specify the type for chartData
}

const LineChart: React.FC<LineChartProps> = ({chartData}) => {

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Footfall data'
      }
    }
  };

  return (
    <div className='chart-container'>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
