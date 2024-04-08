import { AuthContext } from "../Contexts/UserContext";
import { useContext } from "react";
import './Header.css'
import { useNavigate } from "react-router-dom";
export default function Header(){
    const nav = useNavigate();
    const { user, Logout } = useContext(AuthContext);
    function handleLogout(){
        Logout();
        nav('/login');
    }
    return(
        <header>
            <div className="container">
                <div className="username">{'Welcome ' + user.firstName + '!'}</div>
                <button className="LogoutButton" onClick={ handleLogout }>Logout</button>
            </div>
        </header>
    )
}