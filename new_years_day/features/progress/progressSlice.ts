import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "../../app/store";
import { Api } from "../../api";

interface ProgressState {
  totalMinutes: number;
}

const initialState: ProgressState = {
  totalMinutes: 0,
};

export const fetchProgress = createAsyncThunk("progess", async () => {
  const api = await Api.build();
  return await api.getProgress();
});

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProgress.fulfilled,
      (state: ProgressState, action: PayloadAction<number>) => {
        state.totalMinutes = action.payload;
      }
    );
  },
});

export const selectProgressMinutes = (state: AppState): number =>
  state.progress.totalMinutes;
