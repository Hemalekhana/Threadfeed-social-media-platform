import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="custom-navbar">
            <div className="cont-ainer">
                
                <Link to="/dashboard" className="brand">Threadfeed</Link>

               
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                
                <div className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <ul>
                        <li>
                            <button className="theme-toggle">🌙</button>
                        </li>
                        <li><Link to="/Users">Profile</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/chats">Chats</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li>
                            <button className="logout">
                                Logout <i className="logout-icon"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
