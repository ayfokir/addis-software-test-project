/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { useAppSelector } from '../redux/hooks';
import { FaMusic, FaUser, FaCompactDisc, FaPalette } from 'react-icons/fa';
import styled from '@emotion/styled';
import Card from '../component/Statistics/Card';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import BarChart from '../component/Statistics/BarChart';
import SongsPerAlbum from '../component/Statistics/Pichart';

const parent = css`
  background-color: rgb(240, 242, 255);
  padding: 12px 20px;
`;

const cardContainer = css`
  background-color: white;
`;

const mainContainerStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 20px;
  gap: 20px;
`;

const Statistics: React.FC = () => {
  const songs = useAppSelector((state) => state.songs.songs);

  // Define the type for the aggregated data
  interface ArtistData {
    _id: string;
    artist: string;
    albumCount: number;
    songCount: number;
  }

  // Aggregate the data to calculate the number of albums and songs for each artist
  const artistData: Record<string, { artist: string; albums: Set<string>; songCount: number }> = useMemo(() => {
    const data: Record<string, { artist: string; albums: Set<string>; songCount: number }> = {};
    songs.forEach((song) => {
      if (!data[song.artist]) {
        data[song.artist] = {
          artist: song.artist,
          albums: new Set(),
          songCount: 0,
        };
      }
      data[song.artist].albums.add(song.album);
      data[song.artist].songCount += 1;
    });
    return data;
  }, [songs]);

  // Transform the aggregated data into the required format
  const transformedData: ArtistData[] = useMemo(() => 
    Object.values(artistData).map((data, index) => ({
      _id: (index + 1).toString(),
      artist: data.artist,
      albumCount: data.albums.size,
      songCount: data.songCount,
    })), [artistData]
  );

  const columns: MRT_ColumnDef<ArtistData>[] = [
    {
      accessorKey: '_id',
      header: 'No.',
      size: 100,
    },
    {
      accessorKey: 'artist',
      header: 'Artist',
      size: 150,
    },
    {
      accessorKey: 'albumCount',
      header: 'No. of Albums',
      size: 250,
    },
    {
      accessorKey: 'songCount',
      header: 'No. of Songs',
      size: 150,
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: transformedData,
  });

  // Calculate the total number of songs, artists, albums, and genres
  const totalSongs = songs.length;
  const totalArtists = Object.keys(artistData).length;
  const totalAlbums = new Set(songs.map((song) => song.album)).size;
  const totalGenres = new Set(songs.map((song) => song.genre)).size;

  return (
    <Container css={parent}>
      <Title>Statistics</Title>
      <CardContainer css={cardContainer}>
        <Card title="Total Songs" value={totalSongs} icon={<FaMusic />} />
        <Card title="Total Artists" value={totalArtists} icon={<FaUser />} />
        <Card title="Total Albums" value={totalAlbums} icon={<FaCompactDisc />} />
        <Card title="Total Genres" value={totalGenres} icon={<FaPalette />} />
      </CardContainer>
      <div css={mainContainerStyles}>
        <BarChart />
        <SongsPerAlbum />
      </div>
      <div css={TableContainer}>
        <MaterialReactTable table={table} />
      </div>
    </Container>
  );
};

export default Statistics;

// Styled components using @emotion/styled
const Container = styled.div`
  padding: 20px;
`;
const TableContainer = css`
  padding-top: 20px;
`;

const Title = styled.h1`
  padding-left: 20px;
  padding-bottom: 20px;
  font-weight: 600; /* Medium font weight */
  margin: 0;
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
