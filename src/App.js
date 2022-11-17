import Routing from "./routes";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClientProvider, QueryClient } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <NotificationsProvider position="bottom-right" zIndex={2077}>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Routing />
        </QueryClientProvider>
      </div>
    </NotificationsProvider>
  );
};

export default App;
