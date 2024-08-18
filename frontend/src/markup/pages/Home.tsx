/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
// import Table from "../component/Table/Table";
import NewTable from "../component/NewTable/Table";
import Table from "../component/Table/Table";
import getSongs from "../../services/get-songs.service";
import { useEffect } from "react";
import { Song } from "../../utils/Types";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsStart, deleteSongStart } from "../redux/slices/Slice";
import { RootState } from "../redux/store/Store";
import { MRT_ColumnDef } from "material-react-table";
import { setSelectedSong } from "../redux/slices/selectedSongSlice";
import styled from "@emotion/styled";
const homePageStyles  =  css `
    background-color:rgb(240,242,255);
    padding: 12px 20px;
`


const Button = styled.button`
  padding: 10px 20px; /* Increased padding for larger buttons */
  font-size: 16px; /* Increased font size */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px; /* Margin to add gap between buttons */
  &:last-of-type {
    margin-right: 0; /* Remove margin from the last button */
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545; /* Red color for delete button */
`;

const EditButton = styled(Button)`
  background-color: #28a745; /* Green color for edit button */
`;

const StyledTd = styled.td`

  padding: 8px;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Home: React.FC = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleCreateSongsClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
      setIsEditPopupOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      // console.log(`Deleting song with id ${id}`);
      // dispatch(deleteSongStart(id));
    } catch (error) {
      console.log("Error deleting song", error);
    }
  };
  const handleEdit = (row: any) => {
    console.log(`Editing song with id ${row._id}`);
    setIsEditPopupOpen(true);
    dispatch(setSelectedSong(row)); // Dispatch selectSong action with the selected song
  };

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
    {
    accessorKey: 'actions',
    header: 'Action',
    size: 100,
    Cell: ({ row }) => (
      <StyledTd>
      <ButtonContainer>
        <EditButton onClick={() => handleEdit(row)}>Edit</EditButton>
        <DeleteButton onClick={() => handleDelete()}>
          Delete
        </DeleteButton>
      </ButtonContainer>
    </StyledTd>
    ),
  }
  ];
  

  useEffect(() => {
    // Dispatch fetchSongsStart action when the component mounts
    dispatch(fetchSongsStart());
  }, []); // Make sure to include dispatch in the dependency array to avoid unnecessary re-renders

  const songs = useSelector((state: RootState) => state.songs.songs);
  console.log("see the songs inside home page");
  console.log(songs);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);
  return (
    <div css={homePageStyles} >
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p>Error: {error}</p>} {/* Display error message */}
      {/* {!loading && !error && <Table data={songs} columns={columns} />} */}
      {!loading && !error && <NewTable data={songs} columns={columns}  />}
    </div>
  );
};

export default Home;
