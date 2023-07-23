import { createReducer } from "@reduxjs/toolkit";
import {
  addTodoNote,
  fetchTodoNotes,
  setAuthenticate,
  setLoginUserDetailsName,
  setLoginUserDetailsEmail,
  setLoginUserDetailsPassword,
  setSignupLogin,
  setCheckUser,
  setTodo,
  setTodoList,
  updateTodoNote,
  deleteTodoNote,
} from "../actions/index";

type INITIAL_STATE_TYPE = {
  login_signup: boolean;
  authenticate: boolean;
  check_user: boolean;
  userName: string;
  userEmail: string;
  userPassword: string;
  todo: string;
  todoData: [];
};

const INITIAL_STATE: INITIAL_STATE_TYPE = {
  login_signup: false,
  authenticate: false,
  check_user: true,
  userName: "",
  userEmail: "",
  userPassword: "",
  todo: "",
  todoData: [],
};

const actionCombined = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(setSignupLogin, (state, action) => {
    return { ...state, login_signup: action.payload };
  });

  builder.addCase(setAuthenticate, (state, action) => {
    return { ...state, authenticate: action.payload };
  });

  builder.addCase(setLoginUserDetailsName, (state, action) => {
    return { ...state, userName: action.payload };
  });

  builder.addCase(setLoginUserDetailsEmail, (state, action) => {
    return { ...state, userEmail: action.payload };
  });

  builder.addCase(setLoginUserDetailsPassword, (state, action) => {
    return { ...state, userPassword: action.payload };
  });

  builder.addCase(setCheckUser, (state, action) => {
    return { ...state, check_user: action.payload };
  });

  builder.addCase(addTodoNote, (state, action) => {
    return state;
  });

  builder.addCase(updateTodoNote, (state, action) => {
    return state;
  });

  builder.addCase(deleteTodoNote, (state, action) => {
    return state;
  });

  builder.addCase(fetchTodoNotes, (state, action) => {
    return { ...state, todoData: action.payload };
  });

  builder.addCase(setTodo, (state, action) => {
    return { ...state, todo: action.payload };
  });
  builder.addCase(setTodoList, (state, action) => {
    return { ...state, todoData: action.payload };
  });

  builder.addDefaultCase((state) => {
    return state;
  });
});

export default actionCombined;
