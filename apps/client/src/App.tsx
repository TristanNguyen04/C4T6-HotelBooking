import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/PaymentTest';
<<<<<<< HEAD
//import HomePage from './pages/HomePage';
//import HotelDetailsPage from './pages/HotelDetailsPage';
import SearchResultsPage from './pages/SearchResultsPage';
=======
import HomePage from './pages/HomePage';
import Header from "./components/Header";
>>>>>>> 2297ee9215f734f6a62fb4dafcd032abcad469b0
import './styles/index.css';



function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
