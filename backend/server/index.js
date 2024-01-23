const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const { getAllGames, postGame, putGame, updateGamePrice, deleteGame } = require('../database-mysql/index.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/api/games', async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/games', async (req, res) => {
  const gameData = req.body;

  if (!gameData.name || !gameData.picture || !gameData.price || isNaN(gameData.price)) {
    return res.status(400).json({ error: 'Invalid game data' });
  }

  try {
    const updatedGames = await postGame(gameData);
    res.status(201).json({ message: 'Game added successfully', games: updatedGames });
  } catch (error) {
    console.error('Error adding game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/games/:id', async (req, res) => {
  const { id } = req.params;
  const updatedGame = req.body;

  try {
    if (!updatedGame.name || !updatedGame.picture || !updatedGame.price || isNaN(updatedGame.price)) {
      return res.status(400).json({ error: 'Invalid game data' });
    }

    const updatedGames = await putGame(id, updatedGame);
    res.json({ message: 'Game updated successfully', games: updatedGames });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/games/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    const updatedGames = await deleteGame(gameId);
    if (updatedGames) {
      res.json({ message: 'Game deleted successfully', games: updatedGames });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
