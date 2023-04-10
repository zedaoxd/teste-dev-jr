import { AppRoutes } from "./routes";
import { GlobalStyles } from "./styles/globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <GlobalStyles />
    </QueryClientProvider>
  );
}

export default App;
