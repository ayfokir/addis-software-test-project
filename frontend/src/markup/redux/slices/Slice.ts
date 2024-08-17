import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Song interface
export interface Song {
    _id: string | undefined;
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
}

const initialState: SongState = {
    songs: [],
    loading: false,
    error: null,
};

const songSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        fetchSongsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
            state.loading = false;
            state.songs = action.payload;
        },
        fetchSongsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
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
        deleteSongSuccess(state, action: PayloadAction<string>) {
            state.loading = false;
            state.songs = state.songs.filter(song => song._id !== action.payload);
        },
        deleteSongFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
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
