import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import axios from 'axios';
import { AxiosResponse } from 'axios'; // Import AxiosResponse type
import { fetchSongsStart, fetchSongsSuccess, fetchSongsFailure, addSongStart, addSongSuccess, addSongFailure, updateSongStart, updateSongSuccess, updateSongFailure, deleteSongStart,deleteSongSuccess,deleteSongFailure,
} from '../slices/Slice';

interface Song {
    _id: string; // Assuming _id is a string
    title: string;
    artist: string;
    album: string;
    genre: string;
    __v: number; // Assuming __v is a number
}
interface ApiResponse {
    data : {
        success: boolean;
        songs: Song[];
    }
}

// Fetch Songs
// Define API endpoints
const API_URL = process.env.REACT_APP_BASE_URL ;
console.log("see base url:", API_URL)
function* fetchSongs(): Generator {
    try {
        const response = yield call(axios.get, `${API_URL}/api/get`);
        const typedResponse = response as ApiResponse;
        console.log("see the songs")
        console.log(typedResponse)
    yield put(fetchSongsSuccess(typedResponse.data.songs));
    } catch (error: any) {
        yield put(fetchSongsFailure(error.message));
    }
}

// Add Song
function* addSong(action: PayloadAction<FormData>): Generator {
    const API_URL: string = process.env.REACT_APP_API_URL || '';
    try {
        const response: any = yield call(axios.post, `${API_URL}/api/create`, action.payload);
        const typedResponse = response as AxiosResponse<any, ApiResponse>; // Assert type to AxiosResponse<any, ApiResponse>
        console.log("see inside add saga")
        console.log(typedResponse)
        yield put(addSongSuccess(typedResponse.data.song)); // Use typedResponse.data.songs[0]
    } catch (error: any) {
        yield put(addSongFailure(error.message));
    }
}

//Update Song 
function* updateSong(action: PayloadAction<{ _id: string}>): Generator {
    try {
        const { _id} = action.payload;
        console.log("inside Update saga");
        // Append _id to the URL as a query parameter
        const response: any = yield call(axios.patch, `${API_URL}/api/edit/${action.payload._id}`, action.payload);
        const typedResponse = response as AxiosResponse<any, ApiResponse>;
        yield put(updateSongSuccess(typedResponse.data.song));
    } catch (error: any) {
        yield put(updateSongFailure(error.message));
    }
}
// Delete Song
function* deleteSong(action: PayloadAction<string>): Generator {
    console.log("see action ")
    console.log(action)
    try {
        yield call(axios.delete, `${API_URL}/api/delete/${action.payload}`);
        yield put(deleteSongSuccess(action.payload));
    } catch (error: any) {
        yield put(deleteSongFailure(error.message));
    }
}

export default function* watcherSaga(): Generator {
    yield takeLatest(fetchSongsStart.type, fetchSongs);
    yield takeLatest(addSongStart.type, addSong);
    yield takeLatest(updateSongStart.type, updateSong);
    yield takeLeading(deleteSongStart.type, deleteSong);
}







