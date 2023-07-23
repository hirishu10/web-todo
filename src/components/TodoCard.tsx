"use client";

import React, { useState } from "react";
import * as firestore from "firebase/firestore";
import styles from "../app/styles/Todo.module.css";
import { getCustomDTFormatter } from "@hirishu10/simple-date-time";

const TodoCard = ({ todoItem, deleteHandler, updateHandler }: any) => {
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todoItem?.todo);
  const [createdAtTodo, setCreatedAtTodo] = useState(todoItem?.createdAt);

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoContainerTimeStamp}>
        {`Created on: ${createdAtTodo}`}
      </div>
      <div className={styles.todoContainerFirst}>
        <textarea
          value={updatedTodo}
          disabled={!updateFlag}
          className={styles.todoContainerFirstInputBox}
          onChange={(e) => {
            e.preventDefault();
            setUpdatedTodo(e.currentTarget.value);
          }}
        ></textarea>
      </div>
      {/*  */}
      <div className={styles.todoContainerSecond}>
        <div className={styles.deleteButtonWrapper}>
          <button
            className={styles.buttonStyle}
            onClick={(e) => {
              e.preventDefault();
              deleteHandler(todoItem?.id);
            }}
          >
            Delete
          </button>
        </div>
        <div className={styles.updateButtonWrapper}>
          {updateFlag ? (
            <React.Fragment>
              <button
                className={styles.buttonStyle}
                onClick={(e) => {
                  e.preventDefault();
                  setUpdateFlag(false);
                  if (updatedTodo !== todoItem.todo) {
                    setCreatedAtTodo(
                      getCustomDTFormatter().format("dt Mp yyyy h m s ap", {
                        h: " : ",
                        m: ": ",
                      })
                    );
                    updateHandler(todoItem?.id, {
                      todo: updatedTodo,
                      timeStamp: firestore.serverTimestamp(),
                      createdAt: createdAtTodo,
                    });
                  }
                }}
              >
                Save
              </button>
              <button
                className={styles.buttonStyle}
                onClick={(e) => {
                  e.preventDefault();
                  setUpdateFlag(false);
                  setUpdatedTodo(todoItem?.todo);
                }}
              >
                x
              </button>
            </React.Fragment>
          ) : (
            <button
              className={styles.buttonStyle}
              onClick={(e) => {
                e.preventDefault();
                setUpdateFlag(true);
              }}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default TodoCard;
