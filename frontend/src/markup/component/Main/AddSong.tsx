import React, { useState } from 'react';
import styled from '@emotion/styled';
// import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addSongStart } from "../../redux/slices/Slice";
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store/Store';

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
const AddSongForm: React.FC<{  onAddSong: () => void }> = ({ onAddSong }) => {
  const dispatch = useAppDispatch(); // Get dispatch function from Redux
  // Get error state from Redux store
  const addSongFailurError = useAppSelector((state) => state.songs.error);

  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');

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
  
  const handleSubmit =  (e: React.FormEvent) => {
    // dispatch(fetchSongsStart());
    e.preventDefault();
    if (!title || !album || !genre || !artist) {
      setError('All fields are required');
      return;
    }
    setError(''); 
    // Dispatch the addSongStart action with the form data
  let response  =   dispatch(addSongStart({ title, album, genre, artist }));
  console.log(response)
    // Clear the form fields
  };

  return (
    <FormContainer>
      <h3>Add Song</h3>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {addSongFailurError && <div style={{ color: 'red', marginBottom: '10px' }}>{addSongFailurError}</div>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Album:</Label>
          <Input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Genre:</Label>
          <Input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Artist:</Label>
          <Input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
        </FormGroup>
        <Button type="submit">Add Song</Button>
      </form>
    </FormContainer>
  );
};

export default AddSongForm;
