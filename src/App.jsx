import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import TourPage from "./pages/TourPage";
import ReviewsPage from "./pages/ReviewsPage";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import ImprintPage from "./pages/ImprintPage";
import ToursPage from "./pages/ToursPage";

function App() {
  return (
    <BrowserRouter>
      <main className="bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/8-day-cycling" element={<TourPage />} />
          <Route path="/testimonials" element={<ReviewsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/imprint" element={<ImprintPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
