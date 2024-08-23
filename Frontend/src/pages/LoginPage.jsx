import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token); 
            navigate(`/user/${response.data.userId}`);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-page-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-form-title">Login</h2>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
