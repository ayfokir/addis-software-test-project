/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { FaMusic, FaUser, FaCompactDisc, FaPalette } from 'react-icons/fa';
import styled from '@emotion/styled';
import Card from '../component/Statistics/Card';
import { BarChart } from '../component/Statistics/BarChart';
import StatisticsTable1 from '../component/Statistics/StatisticsTable1';
import { RootState } from '../redux/store/Store';
import  SongsPerAlbum from  '../component/Statistics/Pichart'
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { Song } from '../../utils/Types';
const columns1 = [
  { header: "Artist", accessor: "artist" },
  { header: "Number of Albums ", accessor: "album" },
  { header: "Number of Songs", accessor: "song" },
];

const parent   = css`
 background-color:rgb(240,242,255);
 padding: 12px 20px;
`
const cardContainer  = css`
background-color: white;
`
const mainContainerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 20px;
  gap: 20px;
`;

const Statistics: React.FC = () => {
  const songs = useSelector((state: RootState) => state.songs.songs);


  const columns: MRT_ColumnDef<Song>[] = [
    {
      accessorKey: "_id",
      header: "No.",
      size: 100,
    },
    {
      accessorKey: "title",
      header: "Title",
      size: 150,
    },
    {
      accessorKey: "artist",
      header: "Artist",
      size: 250,
    },
    {
      accessorKey: "album",
      header: "Album",
      size: 150,
    },
    {
      accessorKey: "genre",
      header: "Genre",
      size: 150,
    },
  ];

  







  // Prepare data for StatisticsTable1
  const preparedData = songs.reduce<{ [key: string]: { artist: string; album: number; song: number } }>((acc, song) => {
    const { artist, album } = song;
    if (!acc[artist]) {
      acc[artist] = { artist, album: 0, song: 0 };
    }
    acc[artist].album++;
    acc[artist].song++;
    return acc;
  }, {});

  const preparedDataForTable2 = songs.reduce<{ [key: string]: { album: string; song: number } }>((acc, song) => {
    const { album } = song;
    if (!acc[album]) {
      acc[album] = { album, song: 0 };
    }
    acc[album].song++;
    return acc;
  }, {});
    
  // const preparedDataForTable2Array = Object.values(preparedDataForTable2);

  // Convert the object to an array of objects
  const dataForTable = Object.values(preparedData);

  // Calculate total albums
  const totalAlbums = Object.values(preparedData).reduce((acc, artist) => acc + artist.album, 0);

// const table = useMaterialReactTable({
//     columns,
//     dataForTable,
    
// });



  return (
    <Container css={parent}>
      <Title>Statistics</Title>
      <CardContainer css={cardContainer}>
        <Card title="Total Songs" value={songs.length.toString()} icon={<FaMusic />} />
        <Card title="Total Artists" value={Object.keys(preparedData).length.toString()} icon={<FaUser />} />
        <Card title="Total Albums" value={totalAlbums?.toString()} icon={<FaCompactDisc />} />
        <Card title="Total Genres" value={new Set(songs.map(song => song.genre)).size.toString()} icon={<FaPalette />} />
      </CardContainer>
      <div css={mainContainerStyles}>
      <BarChart />
      <SongsPerAlbum />
    </div>
        {/* <StatisticsTable1 data={dataForTable} columns={columns1} /> */}
        {/* <MaterialReactTable table={table} /> */}
    </Container>
  );
};

export default Statistics;

// Styled components using @emotion/styled
const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  padding-left: 20px;
  padding-bottom: 20px;
  font-weight: 600; /* Medium font weight */
  margin: 0

`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
 

`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 1280px) {
    flex-direction: column; /* Switch to column layout */
  }
`;

const ChartWrapper = styled.div`
  flex: 5; /* 50% */
  display: flex;
  align-items: stretch; /* Ensures the height matches the table */
  justify-content: center; /* Center the content inside the wrapper */

`;

const TableWrapper = styled.div`
  flex: 3; /* 30% */
  display: flex;
  align-items: stretch; /* Ensures the height matches the chart */
  & > div {
    flex: 1;
  }
`;
