import { ConfigProvider } from "antd";
import BaseRoutes from "./routes";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#329632",
          fontFamily: '"Roboto Serif", "serif"',
        },
        components: {},
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BaseRoutes />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
