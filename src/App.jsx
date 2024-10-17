import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quran from "./pages/Quran/Quran";
import BacaSurat from "./pages/Quran/BacaSurat";
import Navbar from "./components/Navbar";
import BtnScrollUp from "./components/BtnScrollUp";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Quran />} />
        <Route path="/baca-surat/:name_id" element={<BacaSurat />} />
      </Routes>

      <BtnScrollUp />
      <Footer />
    </Router>
  );
}

export default App;
