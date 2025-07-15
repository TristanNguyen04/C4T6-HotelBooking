import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/PaymentTest';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './pages/SignInPage';
import PaymentSuccess from './pages/PaymentSuccessTest';

import GoogleMap from './pages/GoogleMap';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/hotel/:hotelId" element={<HotelDetailsPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register"element={<Register />} />
        <Route path="/googlemap"element={<GoogleMap/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
