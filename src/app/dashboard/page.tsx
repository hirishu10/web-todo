"use client";

import TodoCard from "@/components/TodoCard";
import { auth, dbAuth } from "../../../firebase";
import * as firebaseAuth from "firebase/auth";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { customDispatch, customSelector } from "../../../reduxHook/hook";
import { useRouter } from "next/navigation";
import {
  addTodoNote,
  deleteTodoNote,
  setAuthenticate,
  setTodo,
  setTodoList,
  updateTodoNote,
} from "@/redux/actions";
import * as firestore from "firebase/firestore";
import styles from "../styles/dashboard.module.css";
import Loader from "@/components/Loader";

export default function Dashboard() {
  const dispatch = customDispatch();
  const { authenticate, todo, todoData } = customSelector(
    (state) => state.actionCombined
  );
  const router = useRouter();

  const fetchAllTodos = useCallback(() => {
    dispatch(setTodoList([]));
    const mainCollection = firestore.collection(dbAuth, "users");
    const mainDocument = firestore.doc(
      mainCollection,
      auth?.currentUser?.email?.toString()
    );
    const childCollection = firestore.collection(mainDocument, "todo");
    const queryDocument = firestore.query(
      childCollection,
      firestore.orderBy("timeStamp", "desc")
    );

    firestore.onSnapshot(queryDocument, {
      next: (res) => {
        let allDocs: any = [];
        res?.docs?.forEach((item, index) => {
          allDocs.push({
            id: item?.id,
            todo: item?.data()?.todo,
            createdAt: item?.data()?.createdAt,
          });
        });
        dispatch(setTodoList(allDocs));
      },
    });
  }, []);

  const addNewTodo = (todo: string) => {
    if (todo !== "") {
      dispatch(addTodoNote(todo));
      dispatch(setTodo(""));
    } else {
      alert("Please enter any text to save ToDo!");
    }
  };

  const deleteHandler = (todoID: string) => {
    dispatch(deleteTodoNote(todoID));
  };

  const updateHandler = (
    todoID: string,
    newData: { todo: string; timeStamp: any; createdAt: string }
  ) => {
    dispatch(updateTodoNote(todoID, newData));
  };

  useEffect(() => {
    try {
      const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          router.replace("/dashboard");
          fetchAllTodos();
          setTimeout(() => {
            dispatch(setAuthenticate(true));
          }, 1000);
        } else {
          router.replace("/");
        }
      });
      return unsubscribe;
    } catch (error) {
      alert("Something went wrong");
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {authenticate ? (
        <React.Fragment>
          <div className={styles.dashboardTodoWrapper}>
            <div className={styles.dashboardTodoWrapperDetails}>
              <Image
                src={auth.currentUser?.photoURL?.toString()}
                alt="icon"
                width={40}
                height={40}
                style={{
                  borderRadius: "50px",
                }}
              />
              <h5>{auth?.currentUser?.displayName}</h5>
            </div>

            <div className={styles.dashboardTodoWrapperInput}>
              <input
                type="text"
                placeholder="Enter Todo"
                style={{ height: "80%", textAlign: "center" }}
                value={todo}
                onChange={(e) => {
                  dispatch(setTodo(e.currentTarget.value));
                }}
              />
              <input
                type="submit"
                style={{ padding: "10px", cursor: "pointer" }}
                value="Add"
                onClick={(e) => {
                  e.preventDefault();
                  addNewTodo(todo);
                }}
              />
            </div>
          </div>

          {/* All Todo's List below */}
          <div className={styles.dashboardTodoListWrapper}>
            {todoData?.length > 0 ? (
              todoData?.map((item: any, index) => (
                <TodoCard
                  key={`Todo${item?.id}`}
                  todoItem={item}
                  deleteHandler={deleteHandler}
                  updateHandler={updateHandler}
                />
              ))
            ) : (
              <div>Nothing here! Plase add some TODO</div>
            )}
          </div>
        </React.Fragment>
      ) : (
        <Loader loadingMessage="Please wait" />
      )}
    </div>
  );
}
