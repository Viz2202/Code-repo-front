import { useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Dashboard from './dashboard/Dashboard.jsx'
import Repositories from './repositories/Repositories'
import Response from './response/Response.jsx'
import PullRequest from './pullrequest/PullRequest.jsx'
import Login from './login/Login.jsx'
import Navbar from './navbar/Navbar.jsx'
import SignUp from './signup/SignUp.jsx'
import AddRepository from './addrepository/AddRepository.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logoImage from './assets/logo.png'
import Layout from './layout/Layout.jsx'
import RouteProtect from './routeprotect.jsx'
function App(){
  return(
    <Router>
      <Routes>
          <Route path="/repos" element={<RouteProtect><Layout><Repositories /></Layout></RouteProtect>} />
          <Route path="/pr" element={<RouteProtect><Layout><PullRequest /></Layout></RouteProtect>} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/response" element={<RouteProtect><Layout><Response /></Layout></RouteProtect>} />
          <Route path="/addrepo" element={<RouteProtect><Layout><AddRepository/></Layout></RouteProtect>}/>
        </Routes>
    </Router>
  );
}
export default App
