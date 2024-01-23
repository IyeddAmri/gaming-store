// database-mysql/index.js
const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool(config);

// Promisify the pool query method
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getAllGames = async () => {
  try {
    const results = await query('SELECT * FROM gaming.games');
    return results;
  } catch (error) {
    throw error;
  }
};

const postGame = async (gameData) => {
  try {
    // Insert the new game into the "games" table
    await query('INSERT INTO gaming.games (name, picture, category, price) VALUES (?, ?, ?, ?)', [
      gameData.name,
      gameData.picture,
      gameData.category,
      gameData.price,
    ]);

    // Fetch all games (including the newly added one)
    const updatedGames = await getAllGames();
    return updatedGames;
  } catch (error) {
    throw error;
  }
};

const putGame = async (gameId, updatedGame) => {
  try {
    // Update the game in the "games" table
    await query('UPDATE gaming.games SET name = ?, picture = ?, category = ?, price = ? WHERE id = ?', [
      updatedGame.name,
      updatedGame.picture,
      updatedGame.category,
      updatedGame.price,
      gameId,
    ]);

    const updatedGames = await getAllGames();
    return updatedGames;
  } catch (error) {
    throw error;
  }
};

const updateGamePrice = async (gameId, newPrice) => {
  try {
    await query('UPDATE gaming.games SET price = ? WHERE id = ?', [newPrice, gameId]);
    const results = await query('SELECT * FROM gaming.games WHERE id = ?', [gameId]);
    return results;
  } catch (error) {
    throw error;
  }
};


const deleteGame = async (gameId) => {
  try {
    await query('DELETE FROM gaming.games WHERE id = ?', [gameId]);
    const updatedGames = await getAllGames();
    return updatedGames;
  } catch (error) {
    throw error;
  }
};

module.exports = { query, getAllGames, postGame, putGame, updateGamePrice, deleteGame };
