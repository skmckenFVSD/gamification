import React from "react";

export default function FaceoffFrame({ children, className = "" }) {
  return <div className={`faceoff-frame ${className}`}>{children}</div>;
}
