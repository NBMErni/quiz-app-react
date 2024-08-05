// timerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    duration: 15000,
    timeLeft: 15000,
    isCompleted: false,
  },
  reducers: {
    setDuration: (state, action) => {
      state.duration = action.payload;
      state.timeLeft = action.payload;
    },
    tick: (state, action) => {
      state.timeLeft = action.payload;
      if (state.timeLeft <= 0) {
        state.isCompleted = true;
      }
    },
    resetTimer: (state) => {
      state.timeLeft = state.duration;
      state.isCompleted = false;
    },
  },
});

export const { setDuration, tick, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;
