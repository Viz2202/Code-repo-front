import React from "react";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </>
  );
}