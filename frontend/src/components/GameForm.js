// GameForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const GameForm = ({ onAddGame }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddGame = () => {
    console.log('Adding game:', { name, price }); // Log the data being sent
    axios.post('http://localhost:5000/api/games', { name, price, category: "action", picture: "httttttttp" })
      .then(response => {
        console.log('Game added:', response.data);
        onAddGame(response.data.games);
        setName('');
        setPrice('');
      })
      .catch(error => console.error('Error adding game:', error));
  };

  return (
    <div>
      <h2 className='new'>Add New Game</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <button className='add' onClick={handleAddGame}>Add Game</button>
    </div>
  );
};

export default GameForm;
