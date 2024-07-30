import logo from './logo.svg';
import './App.scss';
import HomePage from './page/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HomePage />
      </header>
    </div>
  );
}

export default App;
