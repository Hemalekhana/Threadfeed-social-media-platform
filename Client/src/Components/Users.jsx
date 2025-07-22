import './Users.css';
import { useState } from 'react';
import backgroundImg from '../assets/images/background.jpg';
import profileImg from '../assets/images/bitmoji.jpg';
import HappyPost from '../assets/images/happy.jpg';
import JokePost from '../assets/images/jokes.jpeg';
import MotivationPost from '../assets/images/motivation.jpg';
import StrengthPost from '../assets/images/strength.jpg';
import MemePost from '../assets/images/meme.jpg';
import FunPost from '../assets/images/fun.webp';
import Navbar from './Navbar';
function Users() {
    const [posts, setPosts] = useState([]);

    const handleCreatePost = () => {
        const newPost = prompt("Enter your post content:");
        if (newPost) {
            setPosts([newPost, ...posts]);
        }
    };

    return (
        <div className='main'>
                  
      <nav className="navbar">
        <Navbar />
      </nav>
            <div className="img">
                <img src={backgroundImg} height={'800px'}  alt="Background" />
            </div>
            <div className="div-2">
                <div className="profile">
                    <img src={profileImg} alt="Profile" />
                    <div>
                        Name: Balusu. Sai Vasanthi                   
                    </div>
                    <br></br>
                    <div>
                        Place: Eluru
                    </div>
                    <br></br>
                    <div>
                        Bio: Embracing adventures, living dreams one leap at a time. <br />
                         Authenticity is my signature; imitation is not in my vocabulary. <br />
                         Dressed in confidence, I let envy be the choice of others. <br />
                         Evolving daily, stronger than the past, smarter for the future. 
                    </div>
                    <div className="div-3">
                <button onClick={handleCreatePost}>Create Post</button>
            </div>
                </div>
                <div className="posts-container">
                    <div className="matter">
                        <h1>Posts</h1>
                    </div>
                <div className="posts">
                    <div className="card"><img src={FunPost}/></div>
                    <div className="card"><img src={MotivationPost}/></div>
                    <div className="card"><img src={MemePost}/></div>
                    <div className="card"><img src={StrengthPost}/></div>
                    <div className="card"><img src={JokePost}/></div>
                    <div className="card"><img src={HappyPost}/></div>
                    <div className="card"><img src={FunPost}/></div>
                    <div className="card"><img src={MotivationPost}/></div>
                    <div className="card"><img src={MemePost}/></div>
                    <div className="card"><img src={StrengthPost}/></div>
                    <div className="card"><img src={JokePost}/></div>
                    <div className="card"><img src={HappyPost}/></div>
                </div>
                </div>
            </div>
            
        </div>
    );
}

export default Users;