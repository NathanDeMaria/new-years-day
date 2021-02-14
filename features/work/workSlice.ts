import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { AppState, AppThunk } from "../../app/store";
import { Api } from "../../api";
import { Task } from "../tasks/taskSlice";
import { fetchProgress } from "../progress/progressSlice";

export interface Work {
  workId: string;
  task: Task;
  durationMinutes: number;
}

interface WorkUi {
  // TODO: use this somewhere in the UI
  loading: boolean;
}

interface WorkState {
  works: Work[];
  worksLoaded: number;
  worksEnded: boolean;
  ui: WorkUi;
}

const initialState: WorkState = {
  works: [],
  worksLoaded: 0,
  worksEnded: false,
  ui: {
    loading: false,
  },
};

export const fetchWorkPage = createAsyncThunk(
  "work/fetchPage",
  async (start: number) => {
    const api = await Api.build();
    return await api.getWorks(start);
  }
);

export const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchWorkPage.pending,
      (state: WorkState, action: PayloadAction) => {
        state.ui.loading = true;
      }
    );
    builder.addCase(
      fetchWorkPage.fulfilled,
      (state: WorkState, action: PayloadAction<Work[]>) => {
        state.works = [...state.works, ...action.payload];
        state.worksLoaded = state.works.length;
        state.worksEnded = action.payload.length === 0;
        state.ui.loading = false;
      }
    );
    builder.addCase(fetchWorkPage.rejected, (state: WorkState) => {
      state.ui.loading = false;
    });
  },
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

const workSelector = (state: AppState) => state.work;

export const worksSelector = createSelector(
  workSelector,
  (state: WorkState) => state.works
);
export const numWorksSelector = createSelector(
  workSelector,
  (state: WorkState) => state.worksLoaded
);
export const worksEndedSelector = createSelector(
  workSelector,
  (state: WorkState) => state.worksEnded
);
