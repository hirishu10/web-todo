"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "160px" }}>404</h1>
      <p>Page you are looking is not exist!</p>
      <p>
        <Link href="/">Home</Link>
      </p>
      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "8px",
        }}
      >
        <h6>from</h6>
        <h3>web-ToDo App</h3>
      </div>
    </div>
  );
}
