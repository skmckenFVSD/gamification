import React from "react";
import { useLocation } from "react-router-dom";

export default function FaceoffFrame({ children, className = "" }) {
  const location = useLocation();
  const isProfileRoute = location.pathname.endsWith("/profile");

  return (
    <main className={`faceoff-frame ${isProfileRoute ? "faceoff-frame--profile" : ""} ${className}`} id="main-content">
      {children}
    </main>
  );
}
