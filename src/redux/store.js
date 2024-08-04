import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import questionSliceAPI from "./questionSliceAPI";
import timerSlice from "./timerSlice";

// Configure Persist Reducer
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [questionSliceAPI.reducerPath]: questionSliceAPI.reducer,
    timer: timerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionSliceAPI.middleware),
});

export const persistor = persistStore(store);

export default store;