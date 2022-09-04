import "./App.css";
import Routing from "./routes";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  return (
    <NotificationsProvider position="bottom-left" zIndex={2077}>
      <div className="App">
        <header className="App-header">
          <Routing />
        </header>
      </div>
    </NotificationsProvider>
  );
}

export default App;
