import { configureStore, combineReducers } from "@reduxjs/toolkit";

/**
 * Includes every reducer in the app.
 */
const rootReducer = combineReducers({});

/**
 * Global state management store for Redux.
 */
const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});

/**
 * The global AppDispatch type, used to make useDispatch a typed hook.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * The root state type, used to make useSelector a typed hook.
 */
export type RootState = ReturnType<typeof rootReducer>;

export default store;
