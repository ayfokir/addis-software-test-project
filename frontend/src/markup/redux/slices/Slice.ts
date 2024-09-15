import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, DeleteResponse } from '../../../utils/Types';
import { ErrorResponse } from '../../../utils/Types';
// Define the Song interface
export interface Song {
    _id: string ;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

// Define the state interface
interface SongState {
    songs: Song[];
    loading: boolean;
    error: string | null; 
    message:  string
}

const initialState: SongState = {
    songs: [],
    loading: false,
    error: null,
    message:  ""
};

const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        fetchSongsStart(state) { // automatically create action type and action creator 
            state.loading = true;
            state.error = null;
            state.message = ""
        },
        fetchSongsSuccess(state, action: PayloadAction<ApiResponse>) {
            state.loading = false;
            // console.log("see action inside fetchSongSuccess slice:", action)
            state.songs = action.payload.songs;
            state.message =  action.payload.message;
        },
        fetchSongsFailure(state, action: PayloadAction<ErrorResponse>) {
            state.loading = false;
            state.error = action.payload.error;
        },


        addSongStart(state, action: PayloadAction<{ title: string; album: string; genre: string; artist: string }>) {
        state.loading = true;
        state.error = null;
        },
        addSongSuccess(state, action: PayloadAction<Song>) {
            state.loading = false;
            state.songs.push(action.payload);
        },
        addSongFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        updateSongStart(state, action: PayloadAction<{ title: string | undefined; album: string | undefined; genre: string | undefined; artist: string | undefined, _id: string | undefined }>) {
            state.loading = true;
            state.error = null;
        },
        updateSongSuccess(state, action: PayloadAction<Song>) {
            state.loading = false;
            const index = state.songs.findIndex(song => song._id === action.payload._id);
            if (index !== -1) {
                state.songs[index] = action.payload;
            }
        },
        updateSongFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        
        deleteSongStart(state, action: PayloadAction<string>) {
          state.loading = true;
          state.error = null;
        },
        deleteSongSuccess(state, action: PayloadAction<DeleteResponse>) {
            state.loading = false;
            state.songs = state.songs.filter(song => song._id !== action.payload.song._id);
            state.message = action.payload.message
        },
        deleteSongFailure(state, action: PayloadAction<ErrorResponse>) {
            state.loading = false;
            state.error = action.payload.error;
        },
    },
});

export const {
    fetchSongsStart,
    fetchSongsSuccess,
    fetchSongsFailure,
    addSongStart,
    addSongSuccess,
    addSongFailure,
    updateSongStart,
    updateSongSuccess,
    updateSongFailure,
    deleteSongStart,
    deleteSongSuccess,
    deleteSongFailure,
} = songSlice.actions;

export default songSlice.reducer;
