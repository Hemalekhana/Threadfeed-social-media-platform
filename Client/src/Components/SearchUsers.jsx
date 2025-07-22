import { useState } from "react";
import "./searchUsers.css"; 

const SearchUsers = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  
  const dummyUsers = [
    {
      id: 1,
      username: "Alice",
      email: "alice@example.com",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      username: "Bob",
      email: "bob@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      username: "Charlie",
      email: "charlie@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      username: "Alice",
      email: "alice@example.com",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 5,
      username: "Bob",
      email: "bob@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 6,
      username: "Charlie",
      email: "charlie@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 7,
      username: "Alice",
      email: "alice@example.com",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 8,
      username: "Bob",
      email: "bob@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 9,
      username: "Charlie",
      email: "charlie@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    }
  ];

  const handleSearch = async () => {
    if (!query) {
      setResults(dummyUsers); 
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.length === 0 ? (
          dummyUsers.map((user) => (
            <li key={user.id} className="suggested-user">
              <img src={user.profilePic} alt="Profile" width="30" />
              <strong>{user.username}</strong> - {user.email}
            </li>
          ))
        ) : (
          results.map((user) => (
            <li key={user.email} className="searched-user">
              <img src={user.profilePic} alt="Profile" width="30" />
              <strong>{user.username}</strong> - {user.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchUsers;
