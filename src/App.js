import React, { useState } from 'react';
import GameBoard from './GameBoard';
import StartButton from './StartButton';
import PlayerSelection from './PlayerSelection';
import logo from './snake-svgrepo-com.svg';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);

  const handleColorChange = (color, index) => {
    const newPlayers = [...players];
    newPlayers[index].color = color;
    setPlayers(newPlayers);
  };

  const handleNameChange = (name, index) => { // New function to handle name changes
    const newPlayers = [...players];
    newPlayers[index].name = name;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers([...players, { name: '', color: '' }]);
    }
  };

  function onRemovePlayer(index) {
    setPlayers(prevPlayers => prevPlayers.filter((player, i) => i !== index));
  }

  const allColorsChosen = players.length >= 2 && players.every(player => player.color !== '' && player.name !== '');

  return (
    <div className="App-header">
      {!gameStarted ? (
        <>
          <h1>Welcome to the Snake Game</h1>
          <img src={logo} alt="Snake logo" />
          <h3>Please chose the players and their color</h3>
          <PlayerSelection 
            players={players} 
            onColorChange={handleColorChange}
            onNameChange={handleNameChange}
            onRemovePlayer={onRemovePlayer} />
          <button className='plus-button' onClick={addPlayer}>+</button>
          {allColorsChosen && <StartButton onClick={() => setGameStarted(true)} />}
        </>
      ) : (
        <GameBoard players={players} />
      )}
    </div>
  );
}

export default App;