import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quran from "./pages/Quran/Quran";
import BacaSurat from "./pages/Quran/BacaSurat";
import Navbar from "./components/Navbar";
import BtnScrollUp from "./components/BtnScrollUp";
import Footer from "./components/Footer";
import AsmaulHusna from "./pages/Asmaul Husna/AsmaulHusna";
import Doa from "./pages/Doa/Doa";
import BacaDoa from "./pages/Doa/BacaDoa";
import Hadits from "./pages/Hadits/Hadits";
import AutoTop from "./utils/autoTop";
import TafsirAyat from "./pages/Quran/TafsirAyat";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <AutoTop />
      <Routes>
        <Route path="/" element={<Quran />} />
        <Route path="/baca-surat/:nomor" element={<BacaSurat />} />
        <Route
          path="/tafsir-ayat/:nomorSurat/:nomorAyat"
          element={<TafsirAyat />}
        />
        <Route path="/asmaul-husna" element={<AsmaulHusna />} />
        <Route path="/doa" element={<Doa />} />
        <Route path="/baca-doa/:doa" element={<BacaDoa />} />
        <Route path="/hadits" element={<Hadits />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BtnScrollUp />
      <Footer />
    </Router>
  );
}

export default App;
