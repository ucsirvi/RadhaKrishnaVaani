import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Images from "./pages/Images";
import About from "./pages/About";
import Chapters from "./components/Chapters";
import ChapterDetails from "./components/ChapterDetails";
import VerseDetails from "./components/VerseDetails";
import Unsubscribe from "./pages/Unsubscribe";
import Reels from "./pages/Reels.jsx";
import Contact from "./pages/Contact.jsx";


const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/chapters/:chapterId" element={<ChapterDetails />} />
        <Route
          path="/chapters/:chapterId/verse/:verseId"
          element={<VerseDetails />}
        />
        <Route path="/reels" element={<Reels />} />
        <Route path="/images" element={<Images />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
