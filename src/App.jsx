import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import SubmitWin from './pages/SubmitWin.jsx'
import Profile from './pages/Profile.jsx'
import Arcade from './pages/Arcade.jsx'
import HallOfFame from './pages/HallOfFame.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitWin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/arcade" element={<Arcade />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
