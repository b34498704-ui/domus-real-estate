import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Listings from './pages/Listings.jsx';
import PropertyDetails from './pages/PropertyDetails.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AddProperty from './pages/AddProperty.jsx';
import Favorites from './pages/Favorites.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houses" element={<Listings key="houses" scope="houses" />} />
          <Route path="/apartments" element={<Listings key="apartments" scope="apartments" />} />
          <Route path="/rent" element={<Listings key="rent" scope="rent" />} />
          <Route path="/all" element={<Listings key="all" scope="all" />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add" element={<AddProperty />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
