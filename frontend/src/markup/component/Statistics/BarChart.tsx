/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const containerStyles = css`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-bottom: 40px;
  padding-left: 60px;

  flex: 1; /* Ensures it takes the full height of the parent container */
  justify-content: center; /* Center the content vertically */
  
`;

const headerStyles = css`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-left: 20px; /* Add left margin */
  margin-bottom: 0
`;

const hrStyles = css`
  margin-left: 14px;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

const chartContainerStyles = css`
  display: flex;
  justify-content: center;
  overflow-x: auto;
`;

const chartWrapperStyles = css`
  flex: 1; /* Ensures it takes the full height of the parent container */
  width: 100%; /* Ensures it takes the full width of the parent container */

`;

export const BarChart: React.FC = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);

  const genreData = songs.reduce((acc: { [key: string]: number }, song) => {
    const genre = song.genre.trim();
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(genreData),
    datasets: [
      {
        label: 'Total Songs',
        data: Object.values(genreData),
        backgroundColor: '#004e98',
        barThickness: 15,
        borderRadius: 5,
      },
    ],
  };

  return (
    <div css={containerStyles}>
      <h3 css={headerStyles}>Number of Songs per Genre</h3>
      <hr css={hrStyles} />
      <div css={chartContainerStyles}>
        <div css={chartWrapperStyles}>
          <Bar data={data} height={176} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
