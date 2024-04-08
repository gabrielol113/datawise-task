import { useState, useContext } from "react";
import './Login.css';
import { AuthContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    
    const { Login } = useContext(AuthContext);
    const nav = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function handleLogin(ev: React.FormEvent<HTMLFormElement>){
        ev.preventDefault();
        const data = {
            email: username,
            password: password
        }
        Login(data);
        nav('/profile');
    }
    return(
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={ handleLogin }>
                    <div className="titleContainer">
                        <h2>Login</h2>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
                </div>
        </>
    )
}