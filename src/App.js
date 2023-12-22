import snake from './snake-svgrepo-com.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={snake} className="The-Snake" alt="snake" />
        <p>
          The Snake by GW Games
          </p>
          <p>
          <MyButton />
        </p>
      </header>
    </div>
  );
}

function MyButton() {
  return (
    <button>Start the game</button>
  );
}

export default App;
