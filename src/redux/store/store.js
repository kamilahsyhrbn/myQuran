import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";

import quranReducers from "../reducers/quranReducers";
import asmaReducers from "../reducers/asmaReducers";
import haditsReducers from "../reducers/haditsReducers";
import doaReducers from "../reducers/doaReducers";

const rootReducer = combineReducers({
  quran: quranReducers,
  asma: asmaReducers,
  doa: doaReducers,
  hadits: haditsReducers,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
