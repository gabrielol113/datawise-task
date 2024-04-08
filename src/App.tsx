import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import UserContext, { AuthContext } from "./components/Contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import { useContext } from "react";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>    
      <UserContext>
        <Routes>
          <Route path='/' element={ isAuthenticated? <Home/> : <Login/> }/>
          <Route path='/login' element={  <Login/> }/>
          <Route path='/Profile' element={ !isAuthenticated? <Profile/> : <Login/>}/>
        </Routes>
      </UserContext>
    </Router>
  );
}

export default App;
