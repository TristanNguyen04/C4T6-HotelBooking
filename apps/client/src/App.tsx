import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payment from './pages/PaymentTest';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import Header from './components/Header';
import './styles/index.css';

import PaymentSuccess from './pages/PaymentSuccessTest';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
