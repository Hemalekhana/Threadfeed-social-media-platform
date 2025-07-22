import React, { useEffect, useState } from "react";
import "./feed.css"; 

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found. User is not logged in.");
                    return;
                }

                const response = await fetch("http://localhost:5000/api/posts", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched posts:", data);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="fe-ed-container">
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} className="po-st">
                        <div className="post-head-er">
                            <img src={post.user.profilePic} alt="Profile" className="pro-file-pic" />
                            <h4>{post.user.username}</h4>
                        </div>
                        <p>{post.content}</p>
                        {post.image && <img src={post.image} alt="Post" className="po-st-image" />}
                    </div>
                ))
            )}
        </div>
    );
};

export default Feed;
