import Papa from 'papaparse';

export const fetchCSV = async (filename: string) => {
  const response = await fetch(filename);
  const csvText = await response.text();
  const parsedData = Papa.parse(csvText, { header: true }).data;

  // Extract dates and values from parsed CSV data
  const dates = parsedData.map(row => new Date(row.Time).toLocaleDateString('en-CA'));
  const values = parsedData.map(row => Number(row.Value));

  return { dates, values };
}