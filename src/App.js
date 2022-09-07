import Routing from "./routes";
import { NotificationsProvider } from "@mantine/notifications";
import "./App.css";

const App = () => {
  return (
    <NotificationsProvider position="bottom-right" zIndex={2077}>
      <div className="App">
        <header className="App-header">
          <Routing />
        </header>
      </div>
    </NotificationsProvider>
  );
};

export default App;
