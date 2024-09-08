import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { updateSongStart } from "../../redux/slices/Slice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/Store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;
const FormGroup = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const EditSong: React.FC<{onAddSong: () => void;}> = ({ onAddSong }) => {
  const dispatch = useAppDispatch();
  const selectedSong = useAppSelector((state) => state.selectedSong.selectedSong);
  console.log("see the selected song inside Edit component")
  console.log(selectedSong)
  // Get formError state from Redux store
  const { loading, error } = useAppSelector((state) => state.songs);
  console.log(loading)
  console.log(error)
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [_id, setId]   = useState("");
  const [formError, setFormError] = useState("");
  
  useEffect(() => {
    if (selectedSong) {
      setTitle(selectedSong.title);
      setAlbum(selectedSong.album);
      setGenre(selectedSong.genre);
      setArtist(selectedSong.artist);
      setId(selectedSong._id || "");
    }
  }, [selectedSong]);
  
  // useEffect(() => {
  //   if (!loading && error) {
  //     // If there is no formError and the loading is finished, close the popup and reset fields
  //     setTitle("");
  //     setAlbum("");
  //     setGenre("");
  //     setArtist("");
  //     setId("");
  //     onAddSong();
  //   }
  // }, [loading, error, onAddSong]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     // Trim the values to remove leading and trailing spaces
     const trimmedTitle = title.trim();
     const trimmedAlbum = album.trim();
     const trimmedGenre = genre.trim();
     const trimmedArtist = artist.trim();

  // Check if any field is empty after trimming
  if (!trimmedTitle || !trimmedAlbum || !trimmedGenre || !trimmedArtist) {
    setFormError('All fields are required');
    return;
  }
  setFormError(''); 

    dispatch(updateSongStart({ title: trimmedTitle, album: trimmedAlbum, genre: trimmedGenre, artist: trimmedArtist, _id }));
    onAddSong() 
  };
  if (!selectedSong) {
    return <div>No song selected</div>;
  }
  return (
    <FormContainer>
      <h3>Update Song</h3>
      {formError && (<div style={{ color: "red", marginBottom: "10px" }}>{formError}</div>)}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Album:</Label>
          <Input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Genre:</Label>
          <Input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Artist:</Label>
          <Input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </FormGroup>
        <Button type="submit"> Update</Button>
      </form>
    </FormContainer>
  );
};

export default EditSong;
