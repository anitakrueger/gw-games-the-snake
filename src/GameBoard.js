import React, { useState, useEffect } from 'react';
import './GameBoard.css';
import styled, { keyframes } from 'styled-components';

const sparkle = keyframes`
  0% { color: gold; }
  50% { color: yellow; }
  100% { color: gold; }
`;

const Winner = styled.div`
  font-size: 50px;
  text-shadow: 3px 3px 3px rgba(0,0,0,0.5);
  text-align: center;
  animation: ${sparkle} 1s infinite;
`;

const GameBoard = ({ players }) => {
  function restartGame() {
    // Reset the game state
    setWinner(null);
    setPlayerStates(players => players.map(player => ({ name: player.name, color: player.color, position: { x: 10, y: 5 } })) );
    setCurrentPlayerIndex(0);
    // reset the random numbers
    setRandomNumbers(randomNumbers.map(row => row.map(() => null)));
  }

  const [winner, setWinner] = useState(null);
  function findPath() {
    let path = [];
    // start
    path.push({ x: 10, y: 6 });
    // first column
    for (let y = 7; y <= 27; y++) {
      path.push({ x: 10, y: y });
    }
    // bridge
    path.push({ x: 11, y: 28 });
    path.push({ x: 12, y: 28 });
    path.push({ x: 13, y: 28 });
    // second column
    for (let y = 27; y >= 7; y--) {
      path.push({ x: 14, y: y });
    }
    // bridge 2
    path.push({ x: 15, y: 6 });
    path.push({ x: 16, y: 6 });
    path.push({ x: 17, y: 6 });
    // third column
    for (let y = 7; y <= 27; y++) {
      path.push({ x: 18, y: y });
    }
    // bridge 3
    path.push({ x: 19, y: 28 });
    path.push({ x: 20, y: 28 });
    path.push({ x: 21, y: 28 });
    // fourth column
    for (let y = 27; y >= 7; y--) {
      path.push({ x: 22, y: y });
    }
    // bridge 4
    path.push({ x: 23, y: 6 });
    path.push({ x: 24, y: 6 });
    path.push({ x: 25, y: 6 });
    // fifth column
    for (let y = 7; y <= 27; y++) {
      path.push({ x: 26, y: y });
    }
    // bridge 5
    path.push({ x: 27, y: 28 });
    path.push({ x: 28, y: 28 });
    path.push({ x: 29, y: 28 });
    // sixth column
    for (let y = 27; y >= 7; y--) {
      path.push({ x: 30, y: y });
    }
    // bridge 6
    path.push({ x: 31, y: 6 });
    path.push({ x: 32, y: 6 });
    path.push({ x: 33, y: 6 });
    // finish
    path.push({ x: 34, y: 6 });
    return path;
  }

  function handlePlayerMove(playerIndex, path, steps) {
    // Find the current position of the player in the path
    const currentPositionIndex = path.findIndex(cell => 
      cell.x === playerStates[playerIndex].position.x && 
      cell.y === playerStates[playerIndex].position.y
    );

    // Calculate the new position index
    const newPositionIndex = currentPositionIndex + steps;

    // Find the index of the finish square in the path
    const finishSquareIndex = path.findIndex(cell => cell.x === 34 && cell.y === 6);
    console.log("finishSquareIndex: " + finishSquareIndex);

    // Check if the new position is the finish square or beyond
    if (newPositionIndex >= finishSquareIndex) {
      // If it is, set the winner to the current player
      setWinner(playerStates[playerIndex]);
      return; // Stop further execution
    }

    // If the new position index is within the path, move the player to the new position
    if (newPositionIndex < path.length) {
      let newPosition = path[newPositionIndex];

      // Check if the new position is a special field
      if (board[newPosition.y][newPosition.x].special) {
        // If it is, move the player to the target field of the special field
        newPosition = board[newPosition.y][newPosition.x].target;
      }

      setPlayerStates(prevState => prevState.map((player, index) => 
        index === playerIndex ? { ...player, position: newPosition } : player
      ));
    }
  }
  
  console.log(players);
  const [playerStates, setPlayerStates] = useState(
    players.map(player => ({ name: player.name, color: player.color, position: { x: 10, y: 5 } }))
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const nextPlayer = () => {
    setCurrentPlayerIndex((currentPlayerIndex + 1) % playerStates.length);
  };
  const [randomNumbers, setRandomNumbers] = useState(Array(45).fill(null).map(() => Array(45).fill(null)));

  console.log(playerStates);

  const [board, setBoard] = useState(
    Array(35).fill().map(() => Array(45).fill( { color : 'transparent', players: [] } ))
  );

  useEffect(() => {
    // const newBoard = [...board];
    const newBoard = Array(35).fill(null).map(() => Array(45).fill(null).map(() => ({ color: 'transparent', players: [] })));
    // start
    newBoard[6][10].color = 'yellow';
    newBoard[6][10].title = 'Start';
    // first column
    newBoard[7][10].color = 'blue';
    newBoard[8][10].color = 'blue';
    newBoard[9][10].color = 'blue';
    newBoard[10][10].color = 'darkorange';
    newBoard[11][10].color = 'darkorange';
    newBoard[12][10].color = 'darkorange';
    newBoard[13][10].color = 'purple';
    newBoard[14][10].color = 'purple';
    newBoard[15][10].color = 'purple';
    newBoard[16][10].color = 'blue';
    newBoard[17][10].color = 'blue';
    newBoard[18][10].color = 'blue';
    newBoard[19][10].color = 'darkorange';
    newBoard[20][10].color = 'darkorange';
    newBoard[21][10].color = 'darkorange';
    newBoard[22][10].color = 'purple';
    newBoard[23][10].color = 'purple';
    newBoard[24][10].color = 'purple';
    newBoard[25][10].color = 'blue';
    newBoard[26][10].color = 'blue';
    newBoard[27][10].color = 'blue';
    // bridge
    newBoard[28][11].color = 'darkorange';
    newBoard[28][12].color = 'darkorange';
    newBoard[28][13].color = 'darkorange';
    // second column
    newBoard[7][14].color = 'purple';
    newBoard[8][14].color = 'purple';
    newBoard[9][14].color = 'purple';
    newBoard[10][14].color = 'darkorange';
    newBoard[11][14].color = 'darkorange';
    newBoard[11][14].title = 'Skip to next curve';
    newBoard[11][14].special = true;
    newBoard[11][14].target = { x: 16, y: 6 };
    newBoard[12][14].color = 'darkorange';
    newBoard[13][14].color = 'blue';
    newBoard[14][14].color = 'blue';
    newBoard[15][14].color = 'blue';
    newBoard[15][14].title = 'Go over the bridge';
    newBoard[15][14].special = true;
    newBoard[15][14].target = { x: 18, y: 15 };
    newBoard[16][14].color = 'purple';
    newBoard[17][14].color = 'purple';
    newBoard[17][14].title = 'Go back to start';
    newBoard[17][14].special = true;
    newBoard[17][14].target = { x: 10, y: 6 };
    newBoard[18][14].color = 'purple';
    newBoard[19][14].color = 'darkorange';
    newBoard[20][14].color = 'darkorange';
    newBoard[21][14].color = 'darkorange';
    newBoard[22][14].color = 'blue';
    newBoard[23][14].color = 'blue';
    newBoard[24][14].color = 'blue';
    newBoard[25][14].color = 'purple';
    newBoard[26][14].color = 'purple';
    newBoard[27][14].color = 'purple';
    // bridge 2
    newBoard[6][15].color = 'blue';
    newBoard[6][16].color = 'blue';
    newBoard[6][17].color = 'blue';
    // third column
    newBoard[7][18].color = 'darkorange';
    newBoard[8][18].color = 'darkorange';
    newBoard[9][18].color = 'darkorange';
    newBoard[10][18].color = 'purple';
    newBoard[11][18].color = 'purple';
    newBoard[12][18].color = 'purple';
    newBoard[12][18].title = 'Go back 7 steps';
    newBoard[12][18].special = true;
    newBoard[12][18].target = { x: 16, y: 6 };
    newBoard[13][18].color = 'blue';
    newBoard[14][18].color = 'blue';
    newBoard[15][18].color = 'blue';
    newBoard[16][18].color = 'darkorange';
    newBoard[17][18].color = 'darkorange';
    newBoard[18][18].color = 'darkorange';
    newBoard[19][18].color = 'purple';
    newBoard[20][18].color = 'purple';
    newBoard[21][18].color = 'purple';
    newBoard[22][18].color = 'blue';
    newBoard[23][18].color = 'blue';
    newBoard[24][18].color = 'blue';
    newBoard[25][18].color = 'darkorange';
    newBoard[26][18].color = 'darkorange';
    newBoard[27][18].color = 'darkorange';
    // bridge 3
    newBoard[28][19].color = 'purple';
    newBoard[28][20].color = 'purple';
    newBoard[28][21].color = 'purple';
    // fourth column
    newBoard[7][22].color = 'blue';
    newBoard[8][22].color = 'blue';
    newBoard[9][22].color = 'blue';
    newBoard[10][22].color = 'darkorange';
    newBoard[11][22].color = 'darkorange';
    newBoard[12][22].color = 'darkorange';
    newBoard[13][22].color = 'purple';
    newBoard[14][22].color = 'purple';
    newBoard[15][22].color = 'purple';
    newBoard[15][22].title = 'Go over the bridge';
    newBoard[15][22].special = true;
    newBoard[15][22].target = { x: 26, y: 15 };
    newBoard[16][22].color = 'blue';
    newBoard[17][22].color = 'blue';
    newBoard[18][22].color = 'blue';
    newBoard[19][22].color = 'darkorange';
    newBoard[20][22].color = 'darkorange';
    newBoard[21][22].color = 'darkorange';
    newBoard[22][22].color = 'purple';
    newBoard[23][22].color = 'purple';
    newBoard[24][22].color = 'purple';
    newBoard[25][22].color = 'blue';
    newBoard[26][22].color = 'blue';
    newBoard[27][22].color = 'blue';
    // bridge 4
    newBoard[6][23].color = 'darkorange';
    newBoard[6][24].color = 'darkorange';
    newBoard[6][25].color = 'darkorange';
    // fifth column
    newBoard[7][26].color = 'purple';
    newBoard[8][26].color = 'purple';
    newBoard[9][26].color = 'purple';
    newBoard[10][26].color = 'darkorange';
    newBoard[11][26].color = 'darkorange';
    newBoard[12][26].color = 'darkorange';
    newBoard[13][26].color = 'blue';
    newBoard[14][26].color = 'blue';
    newBoard[15][26].color = 'blue';
    newBoard[16][26].color = 'purple';
    newBoard[17][26].color = 'purple';
    newBoard[18][26].color = 'purple';
    newBoard[19][26].color = 'darkorange';
    newBoard[20][26].color = 'darkorange';
    newBoard[21][26].color = 'darkorange';
    newBoard[22][26].color = 'blue';
    newBoard[23][26].color = 'blue';
    newBoard[24][26].color = 'blue';
    newBoard[25][26].color = 'purple';
    newBoard[26][26].color = 'purple';
    newBoard[27][26].color = 'purple';
    // bridge 5
    newBoard[28][27].color = 'darkorange';
    newBoard[28][28].color = 'darkorange';
    newBoard[28][29].color = 'darkorange';
    // sixth column
    newBoard[7][30].color = 'blue';
    newBoard[8][30].color = 'blue';
    newBoard[9][30].color = 'blue';
    newBoard[9][30].title = 'Skip to finish';
    newBoard[9][30].special = true;
    newBoard[9][30].target = { x: 34, y: 6 };
    newBoard[10][30].color = 'purple';
    newBoard[11][30].color = 'purple';
    newBoard[12][30].color = 'purple';
    newBoard[13][30].color = 'darkorange';
    newBoard[14][30].color = 'darkorange';
    newBoard[15][30].color = 'darkorange';
    newBoard[16][30].color = 'blue';
    newBoard[17][30].color = 'blue';
    newBoard[18][30].color = 'blue';
    newBoard[19][30].color = 'purple';
    newBoard[20][30].color = 'purple';
    newBoard[21][30].color = 'purple';
    newBoard[22][30].color = 'darkorange';
    newBoard[23][30].color = 'darkorange';
    newBoard[24][30].color = 'darkorange';
    newBoard[25][30].color = 'blue';
    newBoard[26][30].color = 'blue';
    newBoard[27][30].color = 'blue';
    // bridge 6
    newBoard[6][31].color = 'purple';
    newBoard[6][32].color = 'purple';
    newBoard[6][33].color = 'purple';
    // finish
    newBoard[6][34].color = 'yellow';
    newBoard[6][34].title = 'Finish';

    // ladders
    // 1
    newBoard[15][15].color = 'lightblue';
    newBoard[15][16].color = 'lightblue';
    newBoard[15][17].color = 'lightblue';
    // 2
    newBoard[15][23].color = 'lightblue';
    newBoard[15][24].color = 'lightblue';
    newBoard[15][25].color = 'lightblue';

    // 10 random number fields that can be clicked (2 fields apart)
    const randomFields = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    randomFields.forEach((field) => {
      newBoard[2][field].color = 'white';
      newBoard[2][field].title = 'Click me';
      newBoard[2][field].random = true;
    });

    playerStates.forEach((player, index) => {
      // console log the player and index
      console.log("player " + player);
      console.log("index " + index);
      newBoard[player.position.y][player.position.x].players.push(index);
      console.log("newBoard players position y: " + player.position.y +
      " position x: " + player.position.x + " players: "
       + newBoard[player.position.y][player.position.x].players);
    });

    console.log("second playerStates")
    console.log(playerStates);

    setBoard(newBoard);
  }, [playerStates]);


  return (
    winner ? (
      <Winner>
      Winner: {winner.name}
      <p/><p/>
      <button className="start-button" onClick={restartGame}>Restart Game</button>
      </Winner>
      ) : (
    <>
    <div className="player-name">Current Player: <b>{playerStates[currentPlayerIndex].name}</b></div>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(45, 1fr)` }}>
      {board.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className={`square ${cell.color !== 'transparent' ? 'colored' : ''} ${cell.special ? 'special' : ''}`}
            style={{
              backgroundColor: cell.color,
            }}
            title={cell.title}
            onClick={() => {
              if (cell.random) {
                const newRandomNumbers = randomNumbers.map(row => row.map(() => null));
                const randomNumber = Math.floor(Math.random() * 10) + 1;
                newRandomNumbers[i][j] = randomNumber;
            
                setRandomNumbers(newRandomNumbers);
                const path = findPath(board);
                // Update the current player's position
                handlePlayerMove(currentPlayerIndex, path, randomNumber);

                // Move to the next player
                nextPlayer();
              }
            }}
          >
          {randomNumbers[i][j]}
          {Array.isArray(cell.players) && cell.players.map((playerIndex) => (
          <div 
            key={playerIndex} 
            className={`player-figure player-figure-${playerIndex}`} 
            style={{ 
              backgroundColor: playerStates[playerIndex].color,
              gridRow: playerStates[playerIndex].position.y + 1, 
              gridColumn: playerStates[playerIndex].position.x + 1 
            }} 
          />
          ))}

          </div>
        ))
      )}
    </div>
    </>
    )
  );
};

export default GameBoard;