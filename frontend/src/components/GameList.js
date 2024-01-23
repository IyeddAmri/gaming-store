// GameList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameItem from './GameItem';
import '../App.css';

const GameList = ({ games, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  useEffect(() => {
    handleSearch();
  }, [onSearch, searchTerm]);

  return (
    <div>
      <h2 className='list'>  Game List</h2>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search for a game..."
          className="search-bar searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <GameItem
              game={game}
              onPriceUpdate={onSearch}
              onDeleteGame={() => onSearch(searchTerm)}
              onBuyGame={(game) => console.log(`Game ${game.name} purchased for $${game.price}`)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
