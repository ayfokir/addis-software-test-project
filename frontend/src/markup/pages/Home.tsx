
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from "react";
import Table from "../component/Table/Table";
import getSongs from "../../services/get-songs.service";
import { useEffect } from "react";
import formDataType from "../../utils/FormType";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsStart, deleteSongStart } from "../redux/slices/Slice";
import {RootState} from "../redux/store/Store";
// const data = [
//     { title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", genre: "Rock" },
//     { title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", genre: "Pop" },
//     { title: "Imagine", artist: "John Lennon", album: "Imagine", genre: "Rock" },
//     { title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", genre: "Grunge" },
//     { title: "Hotel California", artist: "Eagles", album: "Hotel California", genre: "Rock" },
//     { title: "Hey Jude", artist: "The Beatles", album: "The Beatles (White Album)", genre: "Rock" },
//     { title: "Like a Rolling Stone", artist: "Bob Dylan", album: "Highway 61 Revisited", genre: "Rock" },
//     { title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", genre: "Rock" },
//     { title: "Thriller", artist: "Michael Jackson", album: "Thriller", genre: "Pop" },
//     { title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", genre: "Grunge" }
//   ];

const columns = [
  { header: "Title", accessor: "title" },
  { header: "Artist", accessor: "artist" },
  { header: "Album", accessor: "album" },
  { header: "Genre", accessor: "genre" },
];
const homeStyles = css`
  padding-bottom: 60px; /* Add padding to the bottom */
`;

const Home: React.FC = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  
  useEffect(() => {
    // Dispatch fetchSongsStart action when the component mounts
    dispatch(fetchSongsStart());
  }, []); // Make sure to include dispatch in the dependency array to avoid unnecessary re-renders
  
  const songs = useSelector((state: RootState) => state.songs.songs);
  console.log("see the songs inside home page")
  console.log(songs)
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);
  return (
    <div css={homeStyles}>
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p>Error: {error}</p>} {/* Display error message */}
      {!loading && !error && (
        <Table data={songs} columns={columns}/>
      )}
    </div>
  );
};

export default Home;
