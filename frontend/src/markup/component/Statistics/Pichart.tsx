/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/Store';
import { css } from '@emotion/react';

ChartJS.register(ArcElement, Tooltip);

const containerStyles = css`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px 40px;
  width: 40%;
  height: 525px;
`;

const headerStyles = css`
  font-family: "Arial", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
`;

const chartContainerStyles = css`
  display: flex;
  flex-direction: row; 
  align-items: center; 
  justify-content: space-between;
`;

const chartWrapperStyles = css`
  display: flex;
  justify-content: center;
  width: 250px;
  height: 250px;
`;

const listContainerStyles = css`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-left: 20px;
`;

const generateColors = (num: number) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    colors.push(color);
  }
  return colors;
};

const SongsPerAlbum: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
        hoverBackgroundColor: ['#007bff', '#28a745', '#dc3545'],
        borderWidth: 0,
      },
    ],
  });

  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    const albumCounts: { [key: string]: number } = {};

    songs.forEach((song) => {
      if (albumCounts[song.album]) {
        albumCounts[song.album]++;
      } else {
        albumCounts[song.album] = 1;
      }
    });

    const albums = Object.keys(albumCounts);
    const counts = Object.values(albumCounts);
    const colors = generateColors(albums.length); // Generate colors dynamically

    setLabels(albums);
    setData({
      labels: albums,
      datasets: [
        {
          data: counts,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
          borderWidth: 0,
        },
      ],
    });
  }, [songs]);

  const options = {
    maintainAspectRatio: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div css={containerStyles}>
      <Typography variant="subtitle2" color="text.secondary" css={headerStyles}>
        Songs Per Album
      </Typography>
      <Card sx={{ borderRadius: '16px', boxShadow: 3 }}>
        <CardContent>
          <Box css={chartContainerStyles}>
            <div css={chartWrapperStyles}>
              <Doughnut data={data} options={options} />
            </div>
            <Box css={listContainerStyles}>
              <List disablePadding>
                {labels.map((label, index) => (
                  <ListItem disableGutters key={index}>
                    <ListItemIcon>
                      <FiberManualRecordIcon sx={{ color: data.datasets[0].backgroundColor[index] }} />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                    <Typography variant="body2">{data.datasets[0].data[index]}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default SongsPerAlbum;
