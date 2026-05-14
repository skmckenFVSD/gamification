import React from "react";

export default function FaceoffFrame({ children, className = "" }) {
  return (
    <main className={`faceoff-frame ${className}`} id="main-content">
      {children}
    </main>
  );
}
