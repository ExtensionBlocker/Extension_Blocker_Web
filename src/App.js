import "./App.css";
import { Route, Routes } from "react-router-dom";
import ExtensionBlocker from "./pages/ExtensionBlocker";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ExtensionBlocker />} />
      </Routes>
    </div>
  );
}

export default App;
