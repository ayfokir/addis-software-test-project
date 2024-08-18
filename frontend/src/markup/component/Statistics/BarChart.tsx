/** @jsxImportSource @emotion/react */
import React from 'react';
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
  padding: 20px 40px; /* Adjust padding to match the SongsPerAlbum component */
  width: 60%;
  height: 565px; /* Set a specific height to match SongsPerAlbum component */
  box-sizing: border-box;
`;

const headerStyles = css`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px; /* Match margin with SongsPerAlbum component */
  margin-top: 0
`;

const hrStyles = css`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 0;
`;

const chartContainerStyles = css`
  display: flex;
  justify-content: center;
  flex: 1; /* Ensures it takes available space */
`;

const chartWrapperStyles = css`
  width: 100%; /* Ensures it takes full width */
  height: 100%; /* Ensures it takes full height */
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
          <Bar data={data} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
