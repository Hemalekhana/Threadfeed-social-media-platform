import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert("Login Successful");
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="page">
            
            <h1>Threadfeed</h1>
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Enter Email" />
            <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Enter Password" /><br />
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <span onClick={() => navigate('/')}>Sign Up</span></p>
        </div>
        </div>
    );
};

export default Login;
