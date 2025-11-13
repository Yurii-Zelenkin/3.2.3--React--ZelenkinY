import { MantineProvider } from "@mantine/core";
import { LaunchList } from "./components/LaunchList/LaunchList";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider>
      <LaunchList />
    </MantineProvider>
  );
}

export default App;
