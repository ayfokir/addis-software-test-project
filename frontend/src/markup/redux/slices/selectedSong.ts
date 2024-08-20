// selectedSongSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define the Song interface
export interface Song {
    _id: string | undefined;
    title: string;
    artist: string;
    album: string;
    genre: string;
}
interface selectedSongState {
    selectedSong: Song | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: selectedSongState = {
    selectedSong: null,
    loading: false,
    error: null,
  };

const selectedSongSlice = createSlice({
  name: 'selectedSong',
  initialState,
  reducers: {
    setSelectedSong(state, action: PayloadAction<Song>) {
      console.log("see selected song ")
      console.log(action)
      state.selectedSong = action.payload;
    },
    clearSelectedSong(state) {
    state.selectedSong = null;
    },
    },
});

export const { setSelectedSong, clearSelectedSong } = selectedSongSlice.actions;

export default selectedSongSlice.reducer;
