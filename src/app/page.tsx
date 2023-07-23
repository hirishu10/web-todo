"use client";

import { useEffect } from "react";
import styles from "./styles/login.module.css";
import { customDispatch, customSelector } from "../../reduxHook/hook";
import {
  setCheckUser,
  setLoginUserDetailsEmail,
  setLoginUserDetailsName,
  setLoginUserDetailsPassword,
  setSignupLogin,
} from "@/redux/actions";

import { auth, provider } from "../../firebase";
import * as firebaseAuth from "firebase/auth";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch = customDispatch();
  const { login_signup, check_user, userName, userEmail, userPassword } =
    customSelector((state) => state.actionCombined);

  const signupEmail = () => {
    if (userName !== "" && userEmail !== "" && userPassword !== "") {
      if (EmailValidator.validate(userEmail)) {
        firebaseAuth
          .createUserWithEmailAndPassword(auth, userEmail, userPassword)
          .then((res) => {
            firebaseAuth
              .updateProfile(res.user, {
                displayName: userName,
                photoURL: "/user.png",
              })
              .then((check) => {
                router.replace("/dashboard");
              });
          })
          .catch((err) => {
            alert(
              "something went wrong while creating account\nOr\nPassword should not less than 8 characters\nOr\nUser already exists!"
            );
          });
      } else {
        alert("Email Id is not valid!");
      }
    } else {
      alert("Please enter the credentials carefully!");
    }
  };

  const loginEmail = () => {
    firebaseAuth
      .signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((res) => {
        router.replace("/dashboard");
      })
      .catch((err) => {
        alert("Email or Password Incorrect!");
      });
  };

  const signInGoogle = () => {
    firebaseAuth
      .signInWithPopup(auth, provider)
      .then((res) => {
        router.replace("/dashboard");
      })
      .catch((err) => {
        alert("something went wrong!");
      });
  };

  useEffect(() => {
    try {
      const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          router.replace("/dashboard");
          dispatch(setCheckUser(true));
        } else {
          router.replace("/");
          dispatch(setCheckUser(false));
        }
      });
      return unsubscribe;
    } catch (error) {
      alert("Something went wrong");
    }
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h2>web-ToDo App</h2>
      </div>
      {check_user ? (
        <div>Please wait.....</div>
      ) : (
        <div className={styles.boxContainer}>
          {/*  */}
          <div className={styles.boxContainerFirst}>
            {login_signup ? (
              <input
                type="text"
                placeholder="Name"
                className={styles.inputStyle}
                value={userName}
                onChange={(e) => {
                  e.preventDefault();
                  dispatch(setLoginUserDetailsName(e.currentTarget.value));
                }}
              />
            ) : null}
            <input
              type="email"
              placeholder="Email"
              className={styles.inputStyle}
              value={userEmail}
              onChange={(e) => {
                e.preventDefault();
                dispatch(setLoginUserDetailsEmail(e.currentTarget.value));
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.inputStyle}
              value={userPassword}
              onChange={(e) => {
                e.preventDefault();
                dispatch(setLoginUserDetailsPassword(e.currentTarget.value));
              }}
            />
          </div>
          {/*  */}
          <div className={styles.boxContainerSecond}>
            <div className={styles.boxContainerSecondWrapper}>
              {login_signup ? (
                <button
                  className={styles.loginSignupButtonText}
                  onClick={(e) => {
                    dispatch(setSignupLogin(false));
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className={styles.loginSignupButtonText}
                  onClick={(e) => {
                    dispatch(setSignupLogin(true));
                  }}
                >
                  Create account
                </button>
              )}
            </div>
            {/*  */}

            <div className={styles.loginSignupContainer}>
              {login_signup ? (
                <button className={styles.signupButton} onClick={signupEmail}>
                  Signup
                </button>
              ) : (
                <button className={styles.loginButton} onClick={loginEmail}>
                  Login
                </button>
              )}
            </div>
          </div>
          {/*  */}
          <div className={styles.boxContainerThird}>
            <button
              style={{
                width: "70%",
                height: "98%",
                border: "none",
                cursor: "pointer",
                marginBottom: "5px",
              }}
              onClick={signInGoogle}
            >
              <img
                src="/loginGoogle.png"
                alt="Login with Google"
                width={210}
                height={48}
              />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
