import { Chart } from "react-google-charts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface WeatherChartProps {
  data: Array<Array<string | number>>;
}

export default function WeatherChart({ data }: WeatherChartProps) {
  const options = {
    title: "Precipitación, Humedad y Nubosidad vs Hora",
    curveType: "function",
    legend: { position: "right" },
    hAxis: { title: "Hora" },
    vAxis: { title: "Unidades" },
    series: {
      0: { color: '#e2431e' },
      1: { color: '#6f9654' },
      2: { color: '#1c91c0' },
    },
    backgroundColor: '#f4f4f4',
    chartArea: { width: '80%', height: '70%' },
  };

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" gutterBottom>
        Precipitación, Humedad y Nubosidad
      </Typography>
      <Chart
        chartType="LineChart"
        data={data}
        width="100%"
        height="400px"
        options={options}
        loader={<div>Loading Chart...</div>}
      />
    </Paper>
  );
}
