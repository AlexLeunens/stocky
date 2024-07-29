import logo from './logo.svg';
import './App.css';
import TickerInformation from './organisms/TickerInformation';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TickerInformation />
      </header>
    </div>
  );
}

export default App;
