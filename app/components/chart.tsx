import React, { useState, useEffect } from 'react';
import BarChart from "@/app/components/bar-chart";
import LineChart from "@/app/components/line-chart";
import { fetchCSV } from '@/app/_lib/csv-parser'
import { ChartType, DataType } from "@/app/types";
import { ChartData } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ChartComponentProps {
  chartType: ChartType;
  dataType: DataType;
}
interface FetchedData {
  dates: string[];
  values: number[];
}


const ChartComponent: React.FC<ChartComponentProps> = ({ chartType, dataType }) => {

  const [chartData, setChartData] = useState<ChartData<'bar'> | ChartData<'line'> | null>(null);
  const [originalData, setOriginalData] = useState<FetchedData | null>(null);
  const [yearlyAverage, setYearlyAverage] = useState(0);
  const [minDate, setMinDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(new Date());
  
  // Normalize data to 0-100 range
  const normalizeData = (rawData: number[]) => {
    const max = Math.max(...rawData);
    return rawData.map(value => (value / max) * 100);
  };

  // Calculate the average of an array of numbers
  const calculateYearlyAverage = (values: number[]): number => {
    const total = values.reduce((acc, value) => acc + value, 0);
    return total / values.length;
  };

  // Fetch data and set initial states
  useEffect(() => {
    const fetchData = async () => {
      const { dates, values } = await fetchCSV('/Footfall.csv');

      // Set the original data for filtering
      setOriginalData({ dates, values });

      // Parse dates into Date objects and set min/max
      const parsedDates = dates.map(date => new Date(date));
      const minParsedDate = new Date(Math.min(...parsedDates));
      const maxParsedDate = new Date(Math.max(...parsedDates));
      const defaultFromDate = new Date(Math.max(...parsedDates));
      defaultFromDate.setMonth(defaultFromDate.getMonth() - 1);

      setMinDate(minParsedDate);
      setMaxDate(maxParsedDate);
      setFromDate(defaultFromDate);
      setToDate(maxParsedDate);
    };

    fetchData();
  }, []);

  // Update the chart data when fromDate, toDate, or dataType changes
  useEffect(() => {
    if (!originalData || !fromDate || !toDate) return;

    // Filter dates and values based on selected date range
    const filteredData = originalData.dates.reduce<{ dates: string[]; values: number[] }>(
      (acc, date, index) => {
        const currentDate = new Date(date);
        if (currentDate >= fromDate && currentDate <= toDate) {
          acc.dates.push(date);
          acc.values.push(originalData.values[index]);
        }
        return acc;
      },
      { dates: [], values: [] }
    );

    // Normalize or use raw data based on dataType
    const dataset = dataType === 'Normalized' ? normalizeData(filteredData.values) : filteredData.values;
    
    // Calculate the yearly average for the filtered data
    const average = calculateYearlyAverage(dataset);
    setYearlyAverage(average);

    // Set colors based on the yearly average
    const colors = dataset.map(value => (value > average ? 'green' : 'red'));

    // Update chart data
    setChartData({
      labels: filteredData.dates,
      datasets: [
        {
          label: 'Footfall',
          data: dataset,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    });
  }, [fromDate, toDate, dataType, originalData]);

  // Choose the chart component based on chartType
  const Chart = chartType === ChartType.Line ? LineChart : BarChart;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <label>
          From Date:
          <DatePicker
            selected={fromDate}
            onChange={(date: Date) => setFromDate(date)}
            minDate={minDate} // Set min date based on data
            maxDate={toDate || maxDate} // Limit fromDate not to exceed toDate
            dateFormat="yyyy-MM-dd"
          />
        </label>
        <label>
          To Date:
          <DatePicker
            selected={toDate}
            onChange={(date: Date) => setToDate(date)}
            minDate={fromDate || minDate} // Limit toDate not to be before fromDate
            maxDate={maxDate} // Set max date based on data
            dateFormat="yyyy-MM-dd"
          />
        </label>
      </div>
      {chartData ? <Chart chartData={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default ChartComponent;
