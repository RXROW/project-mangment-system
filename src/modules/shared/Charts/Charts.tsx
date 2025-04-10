
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
// } from 'chart.js';


// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// interface Props {
//   one: number;
//   two: number;
//   three?: number;
//   colorOne: string;
//   colorTwo: string;
//   colorThree?: string;
// }

// const PieChartComponent = ({ one, two, three, colorOne, colorTwo, colorThree }: Props) => {
    
//     const dataValues = three !== undefined ? [one, two, three] : [one, two];
//     const colors = three !== undefined ? [colorOne, colorTwo, colorThree!] : [colorOne, colorTwo];
  
   
//     const labels = three !== undefined ? ['Progress', 'Tasks Numbers', 'Projects Numbers'] : ['Active Users', 'Inactive Users'];
  
//     const data = {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Dataset 1',
//           data: dataValues,
//           backgroundColor: colors,
//           borderColor: colors,
//           borderWidth: 1,
//         },
//       ],
//     };
  
//     const options = {
//       responsive: true,
//       plugins: {
//         legend: {
//           position: 'top' as const,
//         },
//         title: {
//           display: true,
//           text: 'Chart.js Pie Chart',
//         },
//       },
//     };
  
//     return (
//       <div className="w-75 mt-5">
//         <Pie data={data} options={options} />
//       </div>
//     );
//   };
  
//   export default PieChartComponent;
  



/**////////////////////// */

import { Doughnut } from 'react-chartjs-2';
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
  colorOne?: string;
  colorTwo?: string;
  colorThree?: string;
}

const ChartComponent = ({ one, two, three, colorOne, colorTwo, colorThree }: Props) => {
  const hasThree = three !== undefined;

  const dataValues = hasThree ? [one, two, three!] : [one, two];
  const labels = hasThree ? ['In Progress', 'To Do', 'Done'] : ['Active Users', 'Inactive Users'];

  const defaultColors = hasThree
    ? ['#36A2EB', '#FFCD56', '#FF6384']
    : ['#4CAF50', '#F44336'];

  const colors = hasThree
    ? [colorOne || defaultColors[0], colorTwo || defaultColors[1], colorThree || defaultColors[2]]
    : [colorOne || defaultColors[0], colorTwo || defaultColors[1]];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Overview',
        data: dataValues,
        backgroundColor: colors,
        borderColor: '#fff', 
        borderWidth: 4, 
        cutout: '65%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#555',
          font: {
            size: 14,
            family: 'Montserrat, sans-serif',
          },
        },
      },
      title: {
        display: true,
        text: hasThree ? 'Tasks Overview' : 'Users Overview',
        color: '#333',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-100" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '2rem' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartComponent;