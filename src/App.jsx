import Home from "./pages/Home"
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom"
import Layout from "./layout/Layout"
import Login from "./pages/Login"
import Index from "./pages/Index"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Link to="/" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
