// rootReducer.ts
import { combineReducers } from "redux";
import songReducer from "../slices/Slice";
import selectedSongReducer from "../slices/selectedSong";
import Notification from '../slices/Notification'
const rootReducer = combineReducers({
  songs: songReducer,
  selectedSong: selectedSongReducer,
  notification: Notification
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

//In the above code: 

// The state managed by songReducer will be accessible under state.songs.
// The state managed by selectedSongReducer will be accessible under state.selectedSong.
