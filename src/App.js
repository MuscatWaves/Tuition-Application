import "./App.css";
import Routing from "./routes";
import { HelmetProvider } from "react-helmet-async";
import PrimeReact from 'primereact/api';

PrimeReact.ripple = true;

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <header className="App-header">
          <Routing/>
        </header>
      </HelmetProvider>
    </div>
  );
}

export default App;
