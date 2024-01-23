// GameItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const GameItem = ({ game, onPriceUpdate, onDeleteGame, onBuyGame }) => {
  const [discount, setDiscount] = useState(0);
  const [updatedPrice, setUpdatedPrice] = useState(game.price);

  useEffect(() => {
    setUpdatedPrice(game.price);
  }, [game.price]);

  const handleUpdatePrice = () => {
    const discountedPrice = game.price - (game.price * discount) / 100;

    axios
      .put(`http://localhost:5000/api/games/${game.id}`, {
        name: game.name,
        price: discountedPrice,
        category: "action",
        picture: "httttttttp"
      })
      .then(response => {
        console.log('Game updated:', response.data);
        setUpdatedPrice(response.data.price);
        onPriceUpdate(response.data);
      })
      .catch(error => console.error('Error updating game:', error));
  };

  const handleDeleteGame = () => {
    axios
      .delete(`http://localhost:5000/api/games/${game.id}`)
      .then(response => {
        console.log('Game deleted:', response.data);
        onDeleteGame(game.id);
      })
      .catch(error => console.error('Error deleting game:', error));
  };

  const handleBuyGame = () => {
    console.log(`Game ${game.name} purchased for $${updatedPrice}`);
    onBuyGame(game);
  };

  return (
    <div className={`game-item game-${game.id}`}>
      <h3>{game.name}</h3>
      <p>Price: ${updatedPrice}</p>
      <label>
        Discount (%):
        <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </label>
      <button className="update-btn" onClick={handleUpdatePrice}>
        Update Price
      </button>
      <button className="delete-btn" onClick={handleDeleteGame}>
        Delete Game
      </button>
      <button className="buy-btn" onClick={handleBuyGame}>
        Buy Game
      </button>
    </div>
  );
};

export default GameItem;
