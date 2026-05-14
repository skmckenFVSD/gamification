import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FaceoffAppShell from "./components/FaceoffAppShell.jsx";
import Rink from "./pages/Rink.jsx";
import Standings from "./pages/Standings.jsx";
import Challenges from "./pages/Challenges.jsx";
import Achievements from "./pages/Achievements.jsx";
import PostAWin from "./pages/PostAWin.jsx";
import Arcade from "./pages/Arcade.jsx";
import GameManager from "./pages/GameManager.jsx";
import Profile from "./pages/Profile.jsx";
import Preview from "./pages/Preview.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/preview" element={<Preview />} />
      <Route
        path="/*"
        element={
          <FaceoffAppShell>
            <Routes>
              <Route path="/" element={<Rink />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/post-a-win" element={<PostAWin />} />
              <Route path="/arcade" element={<Arcade />} />
              <Route path="/game-manager" element={<GameManager />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FaceoffAppShell>
        }
      />
    </Routes>
  );
}
