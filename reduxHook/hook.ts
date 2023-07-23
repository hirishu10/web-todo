import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

export const customDispatch = () => useDispatch<AppDispatch>();
export const customSelector: TypedUseSelectorHook<RootState> = useSelector;
