import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:8000/api";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const logIn = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            let jsonRes = await response.json();
            if (response.ok) {
                setError(null);
                setUser(jsonRes.user);
                navigate("/");
            } else {
                setError(jsonRes.error);
                setUser(null);
            }
        } catch (err) {
            setError('Something went wrong');
            setUser(null);
        }
    };

    const logOut = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            });
    
            let jsonRes = await response.json();
            if (response.ok) {
                setError(null);
                setUser(jsonRes.user);
            } else {
                setError("Something went wrong");
                setUser(null);
            }
        } catch (err) {
            setError("Something went wrong");
            setUser(null);
        }
    };

    return (
        <>
            {user && <h1>"Log In"</h1>}

            {error && <p className="error">{error}</p>}

            {user ? <button onClick={logOut}>Log Out</button> :
            
                <div className="center-children">
                <input
                    placeholder="username"
                    value={username}
                    onChange={e=> setUsername(e.target.value)}
                />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={e=> setPassword(e.target.value)}
                />
                <button onClick={logIn}>Log In</button>
                </div>
            }
        </>
    );
}

export default LoginPage;