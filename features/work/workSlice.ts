import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, AppThunk } from "../../app/store";
import { Api } from "../../api";
import { Task } from "../tasks/taskSlice";
import { fetchProgress } from "../progress/progressSlice";

export interface Work {
  workId: string;
  task: Task;
  durationMinutes: number;
}

// I assume I eventually want to keep track of work state in the UI?
interface WorkState {}

const initialState: WorkState = {};

export const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {},
});

export const addWorkThunk = (
  taskId: string,
  durationMinutes: number
): AppThunk => async (dispatch: any) => {
  const api = await Api.build();
  await api.addWork(taskId, durationMinutes);
  // Is this where this goes?
  dispatch(fetchProgress());
};
