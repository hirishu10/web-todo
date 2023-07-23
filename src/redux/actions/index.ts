import {
  SIGNUP_LOGIN,
  ADD_TODO,
  DELETE_TODO,
  FETCH_TODO,
  UPDATE_TODO,
  AUTHENTICATE,
  CHECK_USER,
  LOGIN_USER_DETAILS_EMAIL,
  LOGIN_USER_DETAILS_NAME,
  LOGIN_USER_DETAILS_PASSWORD,
  GET_TODO,
  TODO_LIST,
} from "./types";
import { createAction } from "@reduxjs/toolkit";
import * as firestore from "firebase/firestore";
import { auth, dbAuth } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { getCustomDTFormatter } from "@hirishu10/simple-date-time";

const setSignupLogin = createAction(SIGNUP_LOGIN, (condition) => {
  return {
    payload: condition,
  };
});

const setAuthenticate = createAction(AUTHENTICATE, (condition) => {
  return {
    payload: condition,
  };
});

// ********************* LOGIN USER DETAILS
const setLoginUserDetailsEmail = createAction(
  LOGIN_USER_DETAILS_EMAIL,
  (userEmail: string) => {
    return {
      payload: userEmail,
    };
  }
);
const setLoginUserDetailsName = createAction(
  LOGIN_USER_DETAILS_NAME,
  (userName: string) => {
    return {
      payload: userName,
    };
  }
);
const setLoginUserDetailsPassword = createAction(
  LOGIN_USER_DETAILS_PASSWORD,
  (userPassword: string) => {
    return {
      payload: userPassword,
    };
  }
);
const setCheckUser = createAction(CHECK_USER, (condition: boolean) => {
  return {
    payload: condition,
  };
});
// ********************* LOGIN USER DETAILS

const addTodoNote = createAction(ADD_TODO, (todo: string) => {
  const uuid = uuidv4(); // unique id for all TODOs
  try {
    const mainCollection = firestore.collection(dbAuth, "users");
    const mainDocument = firestore.doc(
      mainCollection,
      auth?.currentUser?.email?.toString()
    );
    //
    const childCollection = firestore.collection(mainDocument, "todo");
    const childDocument = firestore.doc(childCollection, uuid);
    firestore.setDoc(
      childDocument,
      {
        todo: todo,
        timeStamp: firestore.serverTimestamp(),
        createdAt: getCustomDTFormatter().format("dt Mp yyyy h m s ap", {
          h: " : ",
          m: ": ",
        }),
      },
      { merge: true }
    );
  } catch (error) {
    alert("Error! \nPlease check your internet connection and try again");
  }
  return {
    payload: todo,
  };
});

const updateTodoNote = createAction(UPDATE_TODO, (todoID, newData) => {
  const mainCollection = firestore.collection(dbAuth, "users");
  const mainDocument = firestore.doc(
    mainCollection,
    auth?.currentUser?.email?.toString()
  );
  const childCollection = firestore.collection(mainDocument, "todo");
  const childDocument = firestore.doc(childCollection, todoID);

  firestore
    .updateDoc(childDocument, {
      todo: newData?.todo,
      timeStamp: newData?.timeStamp,
      createdAt: newData?.createdAt,
    })
    .then((res) => {})
    .catch((err) => {
      alert("Something went wrong while deleting!");
    });
  return {
    payload: "",
  };
});

const deleteTodoNote = createAction(DELETE_TODO, (todoID) => {
  const mainCollection = firestore.collection(dbAuth, "users");
  const mainDocument = firestore.doc(
    mainCollection,
    auth?.currentUser?.email?.toString()
  );
  const childCollection = firestore.collection(mainDocument, "todo");
  const childDocument = firestore.doc(childCollection, todoID);

  firestore
    .deleteDoc(childDocument)
    .then((res) => {})
    .catch((err) => {
      alert("Something went wrong while deleting!");
    });

  return {
    payload: "",
  };
});

const fetchTodoNotes = createAction(FETCH_TODO, () => {
  const mainCollection = firestore.collection(dbAuth, "users");
  const mainDocument = firestore.doc(
    mainCollection,
    auth?.currentUser?.email?.toString()
  );

  const childCollection = firestore.collection(mainDocument, "todo");

  const queryDocument = firestore.query(childCollection);

  let allDocs: any = [];
  firestore.onSnapshot(queryDocument, {
    next: (res) => {
      res?.docs?.forEach((item, index) => {
        console.log("item " + index, item?.data()?.data);
        allDocs.push({
          data: item?.data()?.data,
          timeStamp: item?.data()?.timeStamp,
        });
      });

      console.log("allDocs", allDocs);
    },

    complete: () => {},
  });

  return {
    payload: allDocs,
  };
});

const setTodo = createAction(GET_TODO, (todo: string) => {
  return {
    payload: todo,
  };
});

const setTodoList = createAction(TODO_LIST, (todo_list: []) => {
  return {
    payload: todo_list,
  };
});

export {
  setSignupLogin,
  setAuthenticate,
  setLoginUserDetailsName,
  setLoginUserDetailsEmail,
  setLoginUserDetailsPassword,
  setCheckUser,
  setTodo,
  setTodoList,
  addTodoNote,
  updateTodoNote,
  deleteTodoNote,
  fetchTodoNotes,
};
