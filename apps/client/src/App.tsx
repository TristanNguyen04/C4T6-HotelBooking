import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/PaymentTest';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import Header from './components/Header';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/hotel/:hotelId" element={<HotelDetailsPage />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
