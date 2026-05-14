import React from "react";
import { FileText } from "lucide-react";
import PagePlaceholder from "./PagePlaceholder.jsx";

export default function PostAWin() {
  return (
    <PagePlaceholder
      kicker="Coming back"
      title="Post a Win"
      description="The Log a Win form from the CopilotRink build, restyled against the Faceoff theme. Submissions feed the Department XP pool."
      icon={FileText}
    />
  );
}
