import React from "react";

export default function ComboTracker({ callouts }) {
  return (
    <div className="arcade-callouts" aria-live="polite">
      {callouts.map((callout) => (
        <div key={callout.id} className={`arcade-callout arcade-callout--${callout.type}`}>
          {callout.text}
        </div>
      ))}
    </div>
  );
}
