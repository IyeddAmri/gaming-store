// App.js
import React, { useState, useEffect } from 'react';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import './App.css';
import axios from 'axios';

const App = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = (searchTerm = '') => {
    const url = searchTerm
      ? `http://localhost:5000/api/games?search=${searchTerm}`
      : 'http://localhost:5000/api/games';

    axios.get(url)
      .then(response => setGames(response.data))
      .catch(error => console.error('Error fetching games:', error));
  };

  const handleAddGame = () => {
    fetchGames();
  };

  const handleSearch = (term) => {
    fetchGames(term);
  };

  return (
    <div>
      <GameForm onAddGame={handleAddGame} />
      <GameList games={games} onSearch={handleSearch} />
    </div>
  );
};

export default App;
