import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const RadialChart = ({ data, options }) => {
  console.log("RadialChart received data:", data); // Debugging log
  return <PolarArea data={data} options={options} />;
};

export default RadialChart;
