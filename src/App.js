import logo from './logo.svg';
import './App.css';
import Banner from './Banner';
import TicketShop from './TicketShop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Banner />
      </header>
      <main>
        <TicketShop />
      </main>
    </div>
  );
}

export default App;
