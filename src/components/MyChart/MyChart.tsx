import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IUser } from '../../interfaces/interfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Date of registration',
    },
  },
};

interface IProps {
  patisipant: IUser[];
  eventTitle: string | null;
}

export const MyChart = ({ patisipant, eventTitle }: IProps) => {
  const uniqueLabels = Array.from(
    new Set(patisipant.map(item => item.registrationDate)).values()
  );

  const getCountOfRegistrationOnDate = (date: string) => {
    const count = patisipant.filter(
      item => item.registrationDate === date
    ).length;
    console.log('count', count);
    return count;
  };

  const data = {
    labels: uniqueLabels,
    datasets: [
      {
        label: eventTitle || 'Event',
        data: uniqueLabels.map(uniqueLabel =>
          getCountOfRegistrationOnDate(uniqueLabel)
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
