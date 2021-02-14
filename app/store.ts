import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  Action,
  ThunkAction,
} from "@reduxjs/toolkit";

import { progressSlice } from "../features/progress/progressSlice";
import { taskSlice } from "../features/tasks/taskSlice";

const rootReducer = combineReducers({
  task: taskSlice.reducer,
  progress: progressSlice.reducer,
});

const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
