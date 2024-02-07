import logo from './logo.svg';
import './App.css';
import TokenMintPage from './components/TokenMintPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ERC20 Token Minting App</h1>
      </header>
      <main>
        <TokenMintPage />
      </main>
    </div>
  );
}

export default App;
