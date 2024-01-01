import React from 'react';
import Select from 'react-select';
import './PlayerSelection.css';

function PlayerSelection({ players, onColorChange, onNameChange, onRemovePlayer }) {
  const colorOptions = [
    { value: 'red', label: 'Red', color: 'red' },
    { value: 'orange', label: 'Orange', color: '#FFA500' },
    { value: 'green', label: 'Green', color: 'green' },
    { value: 'darkblue', label: 'Blue', color: 'darkblue' },
  ];

  const colorStyles = {
    option: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: 'black',
      };
    },
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        color: data.color,
        fontSize: '18px',
      };
    },
    control: (styles) => ({
      ...styles,
      height: '35px',
      minHeight: '30px',
      fontSize: '18px'
    }),
  };

  return (
    <div>
      {players.map((player, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginTop: '10px' }}>
          <input
            className="player-input"
            type="text"
            placeholder="Player name"
            value={player.name}
            onChange={event => onNameChange(event.target.value, index)}
          />
          <Select
            className="player-select"
            options={colorOptions}
            styles={colorStyles}
            value={colorOptions.find(option => option.value === player.color)}
            onChange={option => onColorChange(option.value, index)}
          />
          <button
            className="minus-button"
            onClick={() => onRemovePlayer(index)}>-
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlayerSelection;