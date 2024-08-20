// selectedSongSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define the Song interface
export interface NotificationData {
    message?: string;
    error?: string
    success: boolean
}
  const initialState: NotificationData = {
    message: "",
    error: "",
    success: false
    
  };

const Notification = createSlice({
  name: 'notificationData',
  initialState,
  reducers: {
    SuccessMessage(state, action: PayloadAction<NotificationData>) {
      console.log("see SuccessMessage:", action)
        state.message = action.payload.message
        state.success = action.payload.success
    },
    FailureMessage(state, action: PayloadAction<NotificationData>) {
    state.error = action.payload.error
    state.success = action.payload.success
    },
    clearNotification(state) {
      state.message = "";
      state.error = "";
      state.success= false
    }
    }
});

export const { SuccessMessage, FailureMessage, clearNotification } = Notification.actions;

export default Notification.reducer;
