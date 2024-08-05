// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getAllQuestions: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { getAllQuestions } = questionSlice.actions;

export default questionSlice.reducer;
