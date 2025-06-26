import {
  useDispatch as _useDispatch,
  TypedUseSelectorHook,
  useSelector as _useSelector,
} from "react-redux";
import { AppDispatch, RootState } from "./store";

/**
 * Type-safe version of the useDispatch Redux hook.
 */
export const useDispatch = () => _useDispatch<AppDispatch>();

/**
 * Type-safe version of the useSelector Redux hook.
 */
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
