import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("A verification email has been sent. Please check your inbox and spam.");
            } else {
                alert(data.message);
            }
            
        } catch (error) {
            console.error('Signup error:', error);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="page-signup">
            <h1>Threadfeed</h1>
            <div className="signup-container">
            <h2>Sign Up</h2>
            <input type="text" name="username" value={signupData.username} onChange={handleChange} placeholder="Enter Username" />
            <input type="email" name="email" value={signupData.email} onChange={handleChange} placeholder="Enter Email" />
            <input type="password" name="password" value={signupData.password} onChange={handleChange} placeholder="Enter Password" /><br />
            <button onClick={handleSignup}>Sign Up</button>
            <p>Already have an account? <span onClick={() => navigate('/login')}>Login here</span></p>
        </div>
        </div>
        
    );
};

export default Signup;
