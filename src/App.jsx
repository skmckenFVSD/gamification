import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FaceoffAppShell from "./components/faceoff/FaceoffAppShell.tsx";
import Rink from "./pages/Rink.jsx";
import Standings from "./pages/Standings.jsx";
import Games from "./pages/Games.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Challenges from "./pages/Challenges.jsx";
import Achievements from "./pages/Achievements.jsx";
import PostAWin from "./pages/PostAWin.jsx";
import Arcade from "./pages/Arcade.jsx";
import GameManager from "./pages/GameManager.jsx";
import HallOfFame from "./pages/HallOfFame.jsx";
import Profile from "./pages/Profile.tsx";
import Preview from "./pages/Preview.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { isAuthenticated, currentUser } = useAuth();
  const canManageGames = Boolean(isAuthenticated && currentUser?.permissions?.canManageGames);

  return (
    <Routes>
      <Route path="/preview" element={<Preview />} />
      <Route
        path="/*"
        element={
          <FaceoffAppShell>
            <Routes>
              <Route path="/" element={<Rink />} />
              <Route path="/dashboard" element={<Rink />} />
              <Route path="/games" element={<Games />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/achievements" element={isAuthenticated ? <Achievements /> : <Navigate to="/" replace />} />
              <Route path="/post-a-win" element={isAuthenticated ? <PostAWin /> : <Navigate to="/" replace />} />
              <Route path="/arcade" element={<Arcade />} />
              <Route path="/hall-of-fame" element={<HallOfFame />} />
              <Route path="/game-manager" element={canManageGames ? <GameManager /> : <Navigate to="/" replace />} />
              <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FaceoffAppShell>
        }
      />
    </Routes>
  );
}
