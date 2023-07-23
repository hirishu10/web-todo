"use client";

import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { customDispatch } from "../../reduxHook/hook";
import {
  setLoginUserDetailsEmail,
  setLoginUserDetailsName,
  setLoginUserDetailsPassword,
} from "@/redux/actions";

const Navbar = () => {
  const dispatch = customDispatch();
  const router = useRouter();

  const logoutFunction = async () => {
    try {
      await auth.signOut();
      router.replace("/");
      dispatch(setLoginUserDetailsEmail(""));
      dispatch(setLoginUserDetailsName(""));
      dispatch(setLoginUserDetailsPassword(""));
    } catch (error) {
      alert("something went wrong while logout!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        borderBottom: "1px solid lightgray",
      }}
    >
      <div
        style={{
          width: "48%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: "8px",
        }}
      >
        <h3>web-ToDo App</h3>
      </div>
      <div
        style={{
          width: "52%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "2px",
          paddingRight: "10px",
        }}
      >
        <button
          style={{ padding: "8px", cursor: "pointer" }}
          onClick={logoutFunction}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
