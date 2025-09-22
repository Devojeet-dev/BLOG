import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Redux/user.slice";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// Combine reducers (in case you have more than one slice)
const rootReducer = combineReducers({
  user: userReducer, // Make sure the key is "user" not "name" for clarity
});

const persistConfig = {
  key: "root", // Key for the persist store
  storage: sessionStorage, // Use session storage instead of localStorage
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Directly pass persistedReducer, no need to wrap in an object
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false }), // Correct spelling
});

export const persistor = persistStore(store);
