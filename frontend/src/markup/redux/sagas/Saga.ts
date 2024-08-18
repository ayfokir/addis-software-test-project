import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import axios from 'axios';
import { AxiosResponse } from 'axios'; // Import AxiosResponse type
import { fetchSongsStart, fetchSongsSuccess, fetchSongsFailure, addSongStart, addSongSuccess, addSongFailure, updateSongStart, updateSongSuccess, updateSongFailure, deleteSongStart,deleteSongSuccess,deleteSongFailure,
} from '../slices/Slice';
import { ApiResponse } from '../../../utils/Types';
import { ErrorResponse } from '../../../utils/Types';


// Fetch Songs
// Define API endpoints
const API_URL = process.env.REACT_APP_BASE_URL ;
console.log("see base url:", API_URL)
function* fetchSongs(): Generator {
    try {
        // Type the response as AxiosResponse<any> to handle multiple response types
        const response:any = yield call(axios.get, `${API_URL}/api/get`);
        // Check the type of the response
        if (response.data.success) {
            // Handle ApiResponse
            const apiResponse = response.data as ApiResponse;
            // console.log("Success response:", apiResponse);
            yield put(fetchSongsSuccess(apiResponse));
        } else if (!response.data.success) {
            // Handle ErrorResponse
            const errorResponse = response.data as ErrorResponse;
            // console.log("Error response:", errorResponse);
            yield put(fetchSongsFailure(errorResponse));
        } else {
            // Handle unexpected response format
            yield put(fetchSongsFailure({ error: "Unexpected response format", success: false }));
        }
    } catch (error: any) {
        yield put(fetchSongsFailure({ error: error.message || "Unexpected error occurred", success: false }));
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
     const response : any =    yield call(axios.delete, `${API_URL}/api/delete/${action.payload}`);
     console.log("see delete response:", response.data)
     if (response.data.success) {
         yield put(deleteSongSuccess(response.data));
     }
     else if (!response.data.success) {
        yield put(deleteSongFailure(response.data));
     }
     else {
        // Handle unexpected response format
        yield put(deleteSongFailure({ error: "Unexpected response format", success: false }));
    }
    } catch (error: any) {
        yield put(deleteSongFailure({error: error.message || "Unexpected error occurred", success: false} ));
    }
}

export default function* watcherSaga(): Generator {
    yield takeLatest(fetchSongsStart.type, fetchSongs);
    yield takeLatest(addSongStart.type, addSong);
    yield takeLatest(updateSongStart.type, updateSong);
    yield takeLeading(deleteSongStart.type, deleteSong);
}







