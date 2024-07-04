import { ConfigProvider } from "antd";
import BaseRoutes from "./routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#329632",
          fontFamily: '"Roboto Serif", "serif"',
        },
      }}
    >
      <BaseRoutes />
    </ConfigProvider>
  );
}

export default App;
