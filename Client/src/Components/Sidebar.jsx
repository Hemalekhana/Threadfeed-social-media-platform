import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    const [profile, setProfile] = useState({ name: "", profilePic: "", bio: "" });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setProfile(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="sidebar-">
            <div className="profile-section-">
                <img 
                    src={profile.profilePic || "/default-profile.png"} 
                    alt="Profile" 
                    className="profile-pic-" 
                />
                <h3 className="profile-name-">{profile.username || "User"}</h3>
                <p className="bio-">{profile.bio || "No bio available"}</p>
                <Link to="/edit-profile" className="edit-profile-btn-">Edit Profile</Link>
            </div>
            <ul className="menu-">
                <li><Link to="/friends">Friends List</Link></li>
                <li><Link to="/create">Create Post</Link></li>
                <li><Link to="/notifications">Notifications</Link></li>
                <li><Link to="/explore">Explore</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
