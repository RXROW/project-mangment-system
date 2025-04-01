
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Props {
  one: number;
  two: number;
  three?: number;
  colorOne: string;
  colorTwo: string;
  colorThree?: string;
}

const PieChartComponent = ({ one, two, three, colorOne, colorTwo, colorThree }: Props) => {
    
    const dataValues = three !== undefined ? [one, two, three] : [one, two];
    const colors = three !== undefined ? [colorOne, colorTwo, colorThree!] : [colorOne, colorTwo];
  
   
    const labels = three !== undefined ? ['Progress', 'Tasks Numbers', 'Projects Numbers'] : ['Active Users', 'Inactive Users'];
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: dataValues,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart',
        },
      },
    };
  
    return (
      <div className="w-75 mt-5">
        <Pie data={data} options={options} />
      </div>
    );
  };
  
  export default PieChartComponent;
  

