import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, AppThunk } from "../../app/store";
import { Api } from "../../api";

export interface Task {
  taskId: string;
  name: string;
  weight: number;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const fetchTasks = createAsyncThunk("task/fetchAll", async () => {
  const api = await Api.build();
  return await api.getTasks();
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state: TaskState, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.fulfilled,
      (state: TaskState, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      }
    );
  },
});

const { addTask } = taskSlice.actions;

export const addTaskThunk = (name: string, weight: number): AppThunk => async (
  dispatch: any
) => {
  const api = await Api.build();
  const task = await api.addTask(name, weight);
  dispatch(addTask(task));
};

export const selectTasks = (state: AppState): Task[] => state.task.tasks;
