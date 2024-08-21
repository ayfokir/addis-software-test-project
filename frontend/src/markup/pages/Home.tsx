/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
// import Table from "../component/Table/Table";
import Table from "../component/Table/Table";
// import getSongs from "../../services/get-songs.service";
import { useEffect } from "react";
import { Song } from "../../utils/Types";
import CircularProgress from '@mui/material/CircularProgress';
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchSongsStart, deleteSongStart } from "../redux/slices/Slice";
import { RootState } from "../redux/store/Store";
import { MRT_ColumnDef } from "material-react-table";
import { setSelectedSong } from "../redux/slices/selectedSong";
import styled from "@emotion/styled";
import EditSong from "../component/Main/EditSong";
const homePageStyles = css`
  background-color: rgb(240, 242, 255);
  padding: 12px 20px;
`;
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

const Styled = styled.td`
  padding: 8px;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Add this line
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  z-index: 1001; // Add this line
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Home: React.FC = () => {
  const dispatch = useAppDispatch(); // Get dispatch function from Redux
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handlePopupBackgroundClick = ( e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setIsEditPopupOpen(false);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      // console.log(`Deleting song with id ${id}`);
      dispatch(deleteSongStart(_id));
    } catch (error) {
      console.log("Error deleting song", error);
    }
  };
  const handleEdit = (row: Song) => {
    console.log(`Editing song with id ${row._id}`);
    setIsEditPopupOpen(true);
    console.log("see row:", row);
    dispatch(setSelectedSong(row)); // Dispatch selectSong action with the selected song
  };

  const columns: MRT_ColumnDef<Song>[] = [
    // {
    //   accessorKey: "_id",
    //   header: "No.",
    //   size: 100,
    // },
    {
      accessorKey: "index",
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
      accessorKey: "actions",
      header: "Action",
      size: 100,
      Cell: ({ row }) => (
        <Styled>
          <ButtonContainer>
            <EditButton onClick={() => handleEdit(row.original)}>
              Edit
            </EditButton>
            <DeleteButton onClick={() => handleDelete(row.original._id)}>
              Delete
            </DeleteButton>
          </ButtonContainer>
        </Styled>
      ),
    },
  ];

  useEffect(() => {
    // Dispatch fetchSongsStart action when the component mounts
    dispatch(fetchSongsStart());
  }, []); // Make sure to include dispatch in the dependency array to avoid unnecessary re-renders

  const songs = useAppSelector((state) => state.songs.songs);
  console.log("see the songs inside home page");
  console.log(songs);
  // Add index field
  const indexedSongs = songs.map((song, index) => ({
    ...song,
    index: index + 1,
  }));

  const loading = useAppSelector((state) => state.songs.loading);
  const error = useAppSelector((state) => state.songs.error);
  return (
    <div css={homePageStyles}>
      {/* {loading && <p>Loading...</p>}  */}
      {loading && (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress  size={80}/>
    </div>
  )}
      
      {error && <p>Error: {error}</p>} {/* Display error message */}
      {/* {!loading && !error && <Table data={songs} columns={columns} />} */}
      {!loading && !error && <Table data={indexedSongs} columns={columns} />}
      {isEditPopupOpen && (
        <PopupBackground onClick={handlePopupBackgroundClick}>
          <PopupContent>
            <CloseButton onClick={() => setIsEditPopupOpen(false)}>
              &#10005;
            </CloseButton>
            <EditSong onAddSong={() => setIsEditPopupOpen(false)} />
          </PopupContent>
        </PopupBackground>
      )}
    </div>
  );
};

export default Home;
