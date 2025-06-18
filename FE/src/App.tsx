import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Router from "./routes";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
