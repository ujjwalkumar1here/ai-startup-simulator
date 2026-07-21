import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: "10px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;
