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
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import { AdminAuthProvider } from "./hooks/useAdminAuth";

function App() {
  return (
    <BrowserRouter>
      <main className="bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:slug" element={<TourPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/testimonials" element={<ReviewsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/imprint" element={<ImprintPage />} />

          <Route
            path="/admin/*"
            element={
              <AdminAuthProvider>
                <Routes>
                  <Route path="/" element={<AdminLoginPage />} />
                  <Route
                    path="/bookings"
                    element={
                      <AdminProtectedRoute>
                        <AdminBookingsPage />
                      </AdminProtectedRoute>
                    }
                  />
                </Routes>
              </AdminAuthProvider>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
