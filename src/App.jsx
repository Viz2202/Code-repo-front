import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './dashboard/dashboard'
import Repositories from './repositories/Repositories'
import Response from './response/Response.jsx'
import PullRequest from './pullrequest/PullRequest.jsx'
import Login from './login/Login.jsx'
import Navbar from './navbar/Navbar.jsx'
import SignUp from './signup/SignUp.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/repos" element={<Repositories />} />
        <Route path="/pr" element={<PullRequest />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/response" element={<Response />} />
      </Routes>
    </Router>
  );
}

export default App
