import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quran from "./pages/Quran/Quran";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quran />} />
      </Routes>
    </Router>
  );
}

export default App;
