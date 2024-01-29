import React, { useState } from 'react';
import axios from 'axios';

const SearchUsers = () => {
  const [searchPattern, setSearchPattern] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://localhost:3000/search?pattern=${searchPattern}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Błąd wyszukiwania:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Wprowadź wzorzec wyszukiwania"
        value={searchPattern}
        onChange={(e) => setSearchPattern(e.target.value)}
      />
      <button onClick={handleSearch}>Szukaj</button>

      <div>
        <h2>Wyniki wyszukiwania:</h2>
        <ul>
          {searchResults.map((user) => (
            <li key={user._id}>
              <p>{user.name} {user.surname}</p>
              <p>Email: {user.email}</p>
              <p>Nick: {user.nick}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchUsers;