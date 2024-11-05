import React, { useState, useEffect } from 'react';
import BarChart from "@/app/components/bar-chart";
import LineChart from "@/app/components/line-chart";
import { fetchCSV } from '@/app/_lib/csv-parser'

const ChartComponent = ({ chartType, dataType }) => {
  const [chartData, setChartData] = useState(null);
  
  // Function to normalize data
  const normalizeData = (rawData) => {
    const max = Math.max(...rawData);
    return rawData.map(value => (value / max) * 100);
  };

  // Run the parser once on component mount
  useEffect(() => {

    // Function to parse CSV
    const fetchData = async () => {
      const { dates, values } = await fetchCSV('/Footfall.csv');
      const dataset = dataType === 'Normalized' ? normalizeData(values) : values;

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Footfall',
            data: dataset,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3,
          },
        ],
      });
    };
    
    fetchData();
  }, [dataType, chartType]);

  // Choose the chart component based on chartType
  const Chart = chartType === 'Line' ? LineChart : BarChart;

  return (
    <div style={{ padding: '20px' }}>
      
      {chartData ? <Chart chartData={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default ChartComponent;
