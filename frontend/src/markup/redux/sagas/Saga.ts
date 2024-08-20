import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import axios from 'axios';
import { AxiosResponse } from 'axios'; // Import AxiosResponse type
import { fetchSongsStart, fetchSongsSuccess, fetchSongsFailure, addSongStart, addSongSuccess, addSongFailure, updateSongStart, updateSongSuccess, updateSongFailure, deleteSongStart,deleteSongSuccess,deleteSongFailure,
} from '../slices/Slice';
import {FailureMessage, SuccessMessage} from '../slices/Notification'

import { ApiResponse } from '../../../utils/Types';
import { ErrorResponse } from '../../../utils/Types';


// Fetch Songs
// Define API endpoints
const API_URL = process.env.REACT_APP_BACKEND_URL ;
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
            // yield put(FailureMessage({error: "Unexpected error occurred", success: false} ));
            
        }
    } catch (error: any) {
        yield put(fetchSongsFailure({ error: error.message || "Unexpected error occurred", success: false }));
        // yield put(FailureMessage({error: error.message || "Unexpected error occurred", success: false} ));
    }
}

// Add Song
function* addSong(action: PayloadAction<FormData>): Generator {
    // const API_URL = process.env.REACT_APP_API_URL;
    try {
        const response: any = yield call(axios.post, `${API_URL}/api/create`, action.payload);
        yield put(addSongSuccess(response.data.song)); // Use typedResponse.data.songs[0]
        yield put(SuccessMessage({message: response.data.message, success: response.data.success}))
    } catch (error: any) {
        yield put(addSongFailure(error.message));
        yield put(FailureMessage({error: error.message || "Unexpected error occurred", success: false} ));

    }
}

//Update Song 
function* updateSong(action: PayloadAction<{ _id: string}>): Generator {
    try {
        const { _id} = action.payload;
        // Append _id to the URL as a query parameter
        const response: any = yield call(axios.patch, `${API_URL}/api/edit/${action.payload._id}`, action.payload);
        yield put(updateSongSuccess(response.data.song));
        yield put(SuccessMessage({message: response.data.message, success: response.data.success}))

    } catch (error: any) {
        yield put(updateSongFailure(error.message));
        yield put(FailureMessage({error: error.message || "Unexpected error occurred", success: false} ));

    }
}
// Delete Song
function* deleteSong(action: PayloadAction<string>): Generator {
    try {
     const response : any =    yield call(axios.delete, `${API_URL}/api/delete/${action.payload}`);
     if (response.data.success) {
         yield put(deleteSongSuccess(response.data));
         yield put(SuccessMessage({message: response.data.message, success: response.data.success}))
     }
     else if (!response.data.success) {
        yield put(FailureMessage({message: response.data.message, success: response.data.success}));
     }
     else {
        // Handle unexpected response format
        yield put(FailureMessage({ error: "Unexpected response format", success: false }));
    }
    } catch (error: any) {
        yield put(FailureMessage({error: error.message || "Unexpected error occurred", success: false} ));
    }
}

export default function* watcherSaga(): Generator {
    yield takeLatest(fetchSongsStart.type, fetchSongs);
    yield takeLatest(addSongStart.type, addSong);
    yield takeLatest(updateSongStart.type, updateSong);
    yield takeLeading(deleteSongStart.type, deleteSong);
}







