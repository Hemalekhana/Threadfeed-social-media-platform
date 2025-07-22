import './Dashboard.css'
import Feed from './Feed.jsx';
import Navbar from './Navbar'
import SearchUsers from './SearchUsers.jsx';
import Sidebar from './Sidebar';

const Dashboard=()=>{
    return(
        <div className="dash">
            <div className="nav-bar">
            <Navbar />
            </div>
            <div className="bo-dy">
            <div className="side-bar">
            <Sidebar />
            </div>
            
            <div className="fe-ed">
           
            <Feed />
            
            </div>
            <div className="search-users">
            <SearchUsers />
            </div>
            </div>
        </div>
    )
}


export default Dashboard;